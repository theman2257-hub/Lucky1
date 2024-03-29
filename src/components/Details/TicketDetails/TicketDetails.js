import React, { useEffect, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import Counter from "../../Counter/Counter/Counter";
import { copy, bnb } from "../../../images/images";
import { useAccount, useNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import styles from "./styles.module.css";
import { lotteryABI, erc20Abi } from "../../../constants/abis/abi";
import { Signer, ethers } from "ethers";
import { useSigner } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { redirectDocument, useParams, useNavigate } from "react-router-dom";
import { getClient, chainDict } from "../../Utils/graphClient";
import Loader from "../../Loader";

const TicketDetails = ({
  setOwner,
  setCompetitionEndedModal,
  setImg,
  setDescription,
  setHash,
  setNumberOfWinners,
  setAddress,
  affiliateAddress,
}) => {
  const [ended, setEnded] = useState(false);
  const [time, setTime] = useState("");
  const [show, setShow] = useState(false);
  const [showRemaining, setShowRemaining] = useState(false);
  const [totalTicketsPurchased, setTotalPurchased] = useState(0);
  const [affiliateFee, setAffiliateFee] = useState(0);
  const [prizeAmount, setPrizeAmount] = React.useState(0);
  const [maxWinners, setMaxWinners] = React.useState(0);
  const [distribution, setDistribution] = useState([]);
  const navigate = useNavigate();

  const { id, chain } = useParams();
  const network = useNetwork();
  const txSuccess = (msg) =>
    toast.success(`Successfully Purchased ${msg} Tickets}`);
  const { data } = useSigner();
  let lotteryAddress = id;
  let rpc = "https://bsc-dataseed1.binance.org/";
  let provider = new ethers.providers.JsonRpcProvider(rpc);

  const [lotteryDetails, setLotteryDetails] = useState({});
  let getDetails = async () => {
    let query = `{
      lotteries(where: {lotteryAddress: "${lotteryAddress}"}) {
        id
        creator
    lotteryAddress
    name
    symbol
    ticketPrice
    maxTickets
    
		endDate
		charity
		feeToken
		creatorFee
    charityFee
    maxTicketsPerWallet
    maxWinners
    prizeDistribution
    startTime
    tokenSymbol
      }
    }`;
    let url = "https://api.thegraph.com/subgraphs/name/sallystix/test-lottery";
    const client = getClient(chainDict[chain]);
    const { data } = await client.query(query).toPromise();
    // let lotteryData = data.data.lotteries.map((el) => {
    //   return {
    //     id: el.id,
    //     creator: el.creator,
    //     lotteryAddress: el.lotteryAddress,
    //     name: el.name,
    //     symbol: el.symbol,
    //     ticketPrice: el.ticketPrice,
    //     maxTickets: el.maxTickets,
    //     maxWinners: el.maxWinners,
    //     endDate: el.endDate,
    //     charity: el.charity,
    //     feeToken: el.feeToken,
    //     creatorFee: el.creatorFee,
    //     charityFee: el.charityFee,
    //     prizeDistribution: el.prizeDistribution,
    //     maxTicketsPerWallet: el.maxTicketsPerWallet,
    //     startTime: el.startTime,
    //     tokenSymbol: el.tokenSymbol,
    //   };

    let lotteryData = data.lotteries[0];
    console.log(data.lotteries[0]);
    setLotteryDetails(data.lotteries[0]);
    console.log(lotteryDetails);

    // setLotteryDetails(lotteryData);

    setOwner(lotteryData.creator);
    setAddress(lotteryData.lotteryAddress);
    if (lotteryData.description) setDescription(lotteryData.description);

    let imageURL = `https://api.lucky1.io/images/${
      lotteryData.lotteryAddress
    }.png?${new Date().getTime()}`;
    //check if image exists
    axios
      .get(imageURL)
      .then((res) => {
        setImg(imageURL + "?time=" + new Date().getTime());
      })
      .catch((err) => {
        setImg(
          "https://assets-global.website-files.com/637359c81e22b715cec245ad/63f5feb3302f223a19af4dca_Midnight%20society.png?2322232"
        );
      });
  };

  const getLotteryBalance = async () => {
    if (!lotteryDetails.feeToken || !lotteryDetails.lotteryAddress) return;
    let feeTokenContract = new ethers.Contract(
      lotteryDetails?.feeToken,
      erc20Abi,
      provider
    );
    try {
      let res = await feeTokenContract.balanceOf(
        lotteryDetails?.lotteryAddress
      );
      console.log(ethers.utils.formatEther(res.toString()).toString());
      setPrizeAmount(ethers.utils.formatEther(res.toString()).toString());
    } catch (error) {}
  };

  const getMaxWinners = async () => {
    if (!lotteryDetails.lotteryAddress) return;
    let lotteryContract = new ethers.Contract(
      lotteryDetails?.lotteryAddress,
      lotteryABI,
      provider
    );
    try {
      let res = await lotteryContract.maxWinners();
      const distribution = [];
      for (let i = 0; i < res; i++) {
        let res2 = await lotteryContract.prizeDistribution(i);
        distribution.push(res2.toString());
      }
      setDistribution(distribution);
      setMaxWinners(res.toString());
    } catch (error) {}
  };

  let buyMax = async () => {
    let query = `{
      ticketPurchaseds( where: {lotteryAddress:"${lotteryAddress}", buyer:"${address}"}) {
        id
        lotteryAddress
        buyer
        amount
      }
    }`;
    let url = "https://api.thegraph.com/subgraphs/name/sallystix/test-lottery";
    const client = getClient(chainDict[chain]);
    const { data } = await client.query(query).toPromise();
    const amountPurchased = data.ticketPurchaseds[0].amount;
    console.log(amountPurchased);
    const purchaseableAmount =
      lotteryDetails.maxTicketsPerWallet - amountPurchased;
    if (purchaseableAmount < 1) {
      alert("Can't exceed max tickets per wallet");
      return;
    }
    await purchaseTickets(purchaseableAmount);
  };

  const setModal = () => {
    if (lotteryDetails?.hash) {
      setCompetitionEndedModal(true);
      setNumberOfWinners(lotteryDetails?.numberOfWinners);
      setHash(lotteryDetails?.hash);
    }
  };

  useEffect(() => {
    if (lotteryDetails?.ticketPrice && lotteryDetails?.ticketPrice !== "0") {
      setPrizeAmount(
        ethers.utils
          .formatEther(
            (
              parseInt(lotteryDetails?.ticketPrice) * lotteryDetails?.maxTickets
            ).toString()
          )
          .toString()
      );
      return;
    }

    getLotteryBalance();

    setModal();
  }, [lotteryDetails]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowRemaining((prevShowRemaining) => !prevShowRemaining);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(blinkInterval);
  }, []);

  const date = new Date(lotteryDetails?.endDate * 1000);

  const dateString = date
    .toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(",", "");

  useEffect(() => {
    getIsRunning();
    getDetails();
  }, [data]);

  const purchaseTickets = async (t) => {
    console.log(affiliateAddress, String(t), lotteryAddress);

    let lotteryContract = new ethers.Contract(lotteryAddress, lotteryABI, data);

    try {
      setShow(true);
      let tx = await lotteryContract.purchaseLottery(
        String(t),
        affiliateAddress
      );
      const reciept = await tx.wait();
      setShow(false);
      txSuccess(t);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {}
  };

  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const [quantity, setQuantity] = useState(1);
  const [priceInBnb, setPriceInBnb] = useState(20);
  const [priceInUsd, setPriceInUsd] = useState(30);
  const [allowance, setAllowance] = useState(0);
  const [myTickets, setmyTickets] = useState(0);

  const getIsRunning = async () => {
    try {
      let lotteryContract = new ethers.Contract(
        lotteryAddress,
        lotteryABI,
        data
      );

      let isRunning = await lotteryContract.isRunning();

      if (!isRunning) {
        setCompetitionEndedModal(true);
        setEnded(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function approve() {
    if (!lotteryDetails.feeToken) return;

    let contract = new ethers.Contract(lotteryDetails.feeToken, erc20Abi, data);
    setShow(true);
    try {
      let tx = await contract.approve(
        lotteryAddress,
        ethers.constants.MaxUint256
      );
      let reciept = await tx.wait();
      setShow(false);
      if (reciept && reciept.status) {
        let newAllowance = await contract.allowance(address, lotteryAddress);
        setAllowance(newAllowance.toString());
      }
    } catch (err) {
      console.log(err);
      setShow(false);
    }
  }

  useEffect(() => {
    const getMyTickets = async () => {
      let lotteryContract = new ethers.Contract(
        lotteryAddress,
        lotteryABI,
        data
      );

      if (!address) return;
      try {
        let tickets = await lotteryContract.balanceOf(address);
        setmyTickets(tickets);
      } catch (error) {}
    };

    const getAllowance = async () => {
      if (!address) return;
      if (!lotteryDetails?.feeToken) return;
      try {
        let contract = new ethers.Contract(
          lotteryDetails.feeToken,
          erc20Abi,
          data
        );
        let allowance = await contract.allowance(address, lotteryAddress);
        console.log("IN ALLOWANCE FUNCTION", allowance);
        if (allowance > 0) {
          setAllowance(allowance);
        }
      } catch (error) {}
    };

    const getTotalTicketsPurchased = async () => {
      let query = `
      {
        ticketPurchaseds(where:{lotteryAddress:"${lotteryAddress}"}) {
          amount
        }
      }`;
      let url =
        "https://api.thegraph.com/subgraphs/name/sallystix/test-lottery";
      const client = getClient(chainDict[chain]);
      const { data } = await client.query(query).toPromise();

      let totalPurchased = 0;
      data.ticketPurchaseds.map((item) => {
        totalPurchased += parseInt(item.amount);
      });
      console.log(totalPurchased);

      setTotalPurchased(totalPurchased);
      // setLotteryDetails(lotteryData);
    };

    const getAffiliateFee = async () => {
      if (!lotteryDetails.lotteryAddress) return;
      let lotteryContract = new ethers.Contract(
        lotteryDetails?.lotteryAddress,
        lotteryABI,
        provider
      );

      try {
        let res = await lotteryContract.affiliateFee();
        setAffiliateFee(res.toString());
        // setPrizeAmount(ethers.utils.formatEther(res.toString()).toString());
      } catch (error) {}
    };

    getMyTickets();
    getAllowance();
    getTotalTicketsPurchased();
    getAffiliateFee();
    getMaxWinners();
  }, [address, lotteryDetails, data, lotteryAddress]);

  const titleAndFunction = () => {
    const totalCost = quantity * lotteryDetails.ticketPrice;
    if (!address) {
      return {
        title: "Connect Wallet",
        function: open,
      };
    } else if (
      lotteryDetails.endDate * 1000 < Date.now() ||
      lotteryDetails.maxTickets - totalTicketsPurchased === 0
    ) {
      return {
        title: "End Lottery",
        function: async () => {
          let url = `https://api.lucky1.io/end/end/${chain}/${lotteryAddress}`;
          const { data } = await axios.post(url);
          console.log(data);
          alert("Lottery Ended");
          setCompetitionEndedModal(true);
        },
      };
    } else if (allowance < totalCost) {
      return {
        title: "Approve",
        function: () => approve(),
      };
    } else if (address) {
      return {
        title: "Buy Ticket",
        function: () => purchaseTickets(quantity),
        title2: "Buy Max",
        function2: () => {
          buyMax();
        },
      };
    }
  };

  const bigButton = titleAndFunction();

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key !== "Backspace" && !/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerContainer}>
        <div>
          <h2 className={styles.title}>
            Up to {prizeAmount}{" "}
            {/* {(lotteryDetails?.ticketPrice !== "0"
              ? (lotteryDetails?.maxTickets * lotteryDetails.ticketPrice) /
                10 ** 18
              : prizeAmount) || 0}{" "} */}
            {lotteryDetails.tokenSymbol}
          </h2>
        </div>
        <div>
          {
            <h2
              className={
                showRemaining ? styles.flashingTitleA : styles.flashingTitleB
              }
            >
              only {lotteryDetails.maxTickets - totalTicketsPurchased || 0}/
              {lotteryDetails.maxTickets || 0} tickets left
            </h2>
          }
        </div>
      </div>
      <div className={styles.countDownContainer}>
        {" "}
        <div className={styles.header}>
          <p className={styles.text}></p>
          <div className={styles.infoButtons}>
            <button
              onClick={() => {
                // window.open("profile/" + lotteryDetails?.creator, "_blank");
                navigate(`/profile/${lotteryDetails?.creator}/`);
              }}
              className={styles.liveButton}
            >
              View Creator
            </button>

            <p className={styles.publicRound}>
              <span className={styles.publicRoundText}>
                {" "}
                {lotteryDetails.creatorFee} % Creator Fee
              </span>
            </p>
            <p className={styles.publicRound}>
              <span className={styles.publicRoundText}>
                {" "}
                {affiliateFee} % Affiliate Fee
              </span>
            </p>

            {lotteryDetails.charityFee > 0 && (
              <p className={styles.publicRound}>
                <span className={styles.circle}></span>

                <span className={styles.publicRoundText}>Charity</span>
              </p>
            )}
            {lotteryDetails.ticketPrice <= 0 && (
              <p className={styles.publicRound}>
                <span className={styles.circle}></span>

                <span className={styles.publicRoundText}>Free</span>
              </p>
            )}
            {lotteryDetails.status == 1 && (
              <button className={styles.liveButton}>Ended</button>
            )}
            {lotteryDetails.endDate * 1000 > Date.now() && (
              <button className={styles.liveButton}>Live</button>
            )}
          </div>
        </div>
        <ToastContainer />
        {lotteryDetails.endDate * 1000 > Date.now() ? (
          <Counter
            time={dateString}
            text
            background="rgba(236, 221, 255, 0.1)"
          />
        ) : (
          <p className={[styles.text, styles.lotteryOver].join(" ")}>
            Lottery is Over
          </p>
        )}
      </div>

      <div className={styles.contactAddress}>
        <p className={styles.text}>My Purchased Tickets:</p>
        <div className={styles.address}>
          <p className={styles.text}>
            {parseInt(myTickets)}/{lotteryDetails.maxTicketsPerWallet} Tickets
            per wallet
          </p>
          {/* <img src={copy} alt="#" className={styles.copy} /> */}
        </div>
      </div>
      <div className={styles.contactAddress}>
        <p className={styles.text}>Max Winners:</p>
        <div className={styles.address}>
          <p className={styles.text}>{maxWinners}</p>
          {/* <img src={copy} alt="#" className={styles.copy} /> */}
        </div>
        <p className={styles.text}>Distribution:</p>
        <div className={styles.address}>
          <p className={styles.text}>
            {distribution.map(
              (item, index) =>
                item + "%" + (index === distribution.length - 1 ? "" : ", ")
            )}
          </p>
          {/* <img src={copy} alt="#" className={styles.copy} /> */}
        </div>
      </div>

      <div className={styles.buyContainer}>
        <div className={styles.buyWrapper}>
          <div className={styles.priceWrapper}>
            <div className={styles.bnbContainer}>
              <img src={bnb} alt="#" />{" "}
            </div>
            <div className={styles.price}>
              <p className={styles.bnb}>
                {lotteryDetails.ticketPrice
                  ? ethers.utils.formatEther(lotteryDetails.ticketPrice) *
                    quantity
                  : 0}{" "}
                {lotteryDetails.tokenSymbol}
              </p>
              {/* <p className={styles.usd}>
                (${(priceInUsd * quantity).toFixed(2)})
              </p> */}
            </div>
          </div>

          <div className={styles.quantityWrapper}>
            <div className={styles.iconContainer} onClick={decrease}>
              <BiMinus className={styles.icon} />
            </div>
            <div className={styles.quantity}>
              <input
                min="1"
                type="number"
                inputMode="numeric"
                className={styles.input}
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className={styles.iconContainer} onClick={increase}>
              <BiPlus className={styles.icon} />
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.buttonContainer}>
            <button
              disabled={network.chain?.name !== chainDict[chain]}
              onClick={bigButton.function}
              className={styles.button}
            >
              {bigButton.title}
            </button>
            {network.chain?.name !== chainDict[chain] && (
              <p style={{ color: "red" }}>
                connect to {chainDict[chain]} first
              </p>
            )}
          </div>
          {bigButton.title2 && (
            <div className={styles.buttonContainer}>
              <button
                disabled={network.chain.name !== chainDict[chain]}
                onClick={bigButton.function2}
                className={styles.button}
              >
                {bigButton.title2}
              </button>
              {network.chain.name !== chainDict[chain] && (
                <p style={{ color: "red" }}>
                  connect to {chainDict[chain]} first
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <Loader show={show} />
    </div>
  );
};
export default TicketDetails;

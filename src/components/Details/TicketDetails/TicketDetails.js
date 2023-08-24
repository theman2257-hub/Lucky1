import React, { useEffect, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import Counter from "../../Counter/Counter/Counter";
import { copy, bnb } from "../../../images/images";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import styles from "./styles.module.css";
import { lotteryABI, erc20Abi } from "../../../constants/abis/abi";
import { ethers } from "ethers";
import { useSigner } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const TicketDetails = ({ setOwner, setCompetitionEndedModal, setImg, setDescription, setHash, setNumberOfWinners }) => {
  const [ended, setEnded] = useState(false)
  const [time, setTime] = useState("")
  const { id } = useParams();
  const txSuccess = (msg) =>
    toast.success(`Successfully Purchased ${msg} Tickets}`);
  const { data } = useSigner();
  let lotteryAddress = id;
  let provider = "https://data-seed-prebsc-1-s1.binance.org:8545/";

  let lotteryContract = new ethers.Contract(lotteryAddress, lotteryABI, data);

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
    }`
    let url = "https://api.thegraph.com/subgraphs/name/sallystix/test-lottery";
    const response = await axios.post(url, { query });
    const data = response.data;
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

    let lotteryData = data.data.lotteries[0]
    console.log(data.data.lotteries[0])
    setLotteryDetails(data.data.lotteries[0])
    // setLotteryDetails(lotteryData);

    setOwner(lotteryData.creator);
    if (lotteryData.description) setDescription(lotteryData.description);

    let imageURL = `https://api.lucky1.io/images/${lotteryData.lotteryAddress}.png?${new Date().getTime()}`;
    //check if image exists
    axios.get(imageURL).then((res) => {
      setImg(imageURL + "?time=" + new Date().getTime());
    }).catch((err) => {
      setImg("https://assets-global.website-files.com/637359c81e22b715cec245ad/63f5feb3302f223a19af4dca_Midnight%20society.png?2322232");
    })
  };
  console.log("running")
  const setModal = () => {
    if (lotteryDetails?.hash) {
      setCompetitionEndedModal(true)
      setNumberOfWinners(lotteryDetails?.numberOfWinners)
      setHash(lotteryDetails?.hash)
    }
  };

  useEffect(() => {
    setModal()
  }, [lotteryDetails])
  const date = new Date(lotteryDetails?.endDate * 1000);

  const dateString = date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).replace(',', '');

  useEffect(() => {
    getDetails();
  }, []);

  const purchaseTickets = async (t) => {
    try {
      let tx = await lotteryContract.purchaseLottery(String(t));
      const reciept = await tx.wait();
      txSuccess(t);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
    }
  };

  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const [quantity, setQuantity] = useState(1);
  const [priceInBnb, setPriceInBnb] = useState(20);
  const [priceInUsd, setPriceInUsd] = useState(30);
  const [allowance, setAllowance] = useState(0);
  const [myTickets, setmyTickets] = useState(0);

  const getMyTickets = async () => {
    if (!address) return;
    try {
      let tickets = await lotteryContract.balanceOf(address);
      setmyTickets(tickets);
    } catch (error) {
    }
  };

  const getIsRunning = async () => {
    let isRunning = await lotteryContract.isRunning();
    if (!isRunning) {
      setCompetitionEndedModal(true)
      setEnded(true)
    }
  }

  getIsRunning();
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
      if (allowance > 0) {
        setAllowance(true);
      }
    } catch (error) {
    }
  };

  getAllowance();

  async function approve() {
    if (!lotteryDetails.feeToken) return;
    let contract = new ethers.Contract(lotteryDetails.feeToken, erc20Abi, data);
    let tx = await contract.approve(lotteryAddress, ethers.constants.MaxUint256);
    let reciept = await tx.wait();
    if (reciept && reciept.status) {
      setAllowance(true);
    }
  }

  useEffect(() => {

  }, [address]);

  useEffect(() => {
    getMyTickets();
    getAllowance();
  }, [address, allowance]);

  const titleAndFunction = () => {
    if (!address) {
      return {
        title: "Connect Wallet",
        function: open,
      };
    } else if (lotteryDetails.endDate * 1000 < Date.now()) {
      return {
        title: "End Lottery",
        function: async () => {
          let url = `https://api.lucky1.io/end/end/${lotteryAddress}`;
          const { data } = await axios.post(url);
          console.log(data)
          alert("Lottery Ended")
          setCompetitionEndedModal(true);
        },
      };
    } else if (!allowance) {
      return {
        title: "Approve",
        function: () => approve(),
      };
    } else if (address) {
      return {
        title: "Buy Ticket",
        function: () => purchaseTickets(quantity),
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
      <h2 className={styles.title}>{lotteryDetails?.maxTickets * (lotteryDetails.ticketPrice) / 10 ** 18} {lotteryDetails.tokenSymbol}</h2>
      <div className={styles.countDownContainer}>
        {" "}
        <div className={styles.header}>
          <p className={styles.text}></p>
          <div className={styles.infoButtons}>


            <button
              onClick={() => {
                window.open("profile/" + lotteryDetails?.creator, "_blank");
              }}
              className={styles.liveButton}>View Creator</button>
            <p className={styles.publicRound}>
              <span className={styles.publicRoundText}>
                {" "}
                {lotteryDetails.creatorFee} % Creator Fee
              </span>
            </p>

            {lotteryDetails.charityFee > 0 && <p className={styles.publicRound}>
              <span className={styles.circle}></span>

              <span className={styles.publicRoundText}>Charity</span>
            </p>}
            {lotteryDetails.ticketPrice <= 0 && <p className={styles.publicRound}>
              <span className={styles.circle}></span>

              <span className={styles.publicRoundText}>Free</span>
            </p>}
            {lotteryDetails.status == 1 && <button className={styles.liveButton}>Ended</button>}
            {lotteryDetails.endDate * 1000 > Date.now() && <button className={styles.liveButton}>Live</button>}
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
          <p className={styles.text}>{parseInt(myTickets)} Tickets</p>
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
                  ? ethers.utils.formatEther(lotteryDetails.ticketPrice)
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
        <button onClick={bigButton.function} className={styles.button}>
          {bigButton.title}
        </button>
      </div>
    </div>
  );
};
export default TicketDetails;

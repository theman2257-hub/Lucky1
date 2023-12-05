import React, { useState } from "react";
import Input from "../../components/CreateLottery/Input/Input";
import { textIcon, dollar, usdt, calender, winner } from "../../images/images";
import styles from "./styles.module.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useSigner } from "wagmi";
import Loader from "../../components/Loader";
import SetPrizeAmountModal from "../../components/CreateLottery/SetPrizeAmountModal/SetPrizeAmountModal";
import { erc20Abi } from "../../constants/abis/abi";

const CreateLottery = () => {
  const { data: signer } = useSigner();
  const [imgurl, setImgurl] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showPrizeAmountModal, setShowPrizeAmountModal] = useState(false);
  const [prizeAmount, setPrizeAmount] = useState("");
  const [lotteryAddress, setLotteryAddress] = useState("");
  const { affiliateAddress } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(imgurl);
    updateImage("0xC822B224981983B6c5606c1a743E41d2E56F7c18");
  }, [imgurl]);

  React.useEffect(() => {
    setValues({ ...values, ["affiliateAddress"]: affiliateAddress });
  }, [affiliateAddress]);

  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let factoryABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "creator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "lottery",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "ticketPrice",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "maxTickets",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "endDate",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "charity",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "feeToken",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "creatorFee",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "charityFee",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "startTime",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "maxTicketsPerWallet",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "maxWinners",
          type: "uint256",
        },
      ],
      name: "LotteryCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [],
      name: "affiliateFee",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "affiliateFeeOnCreation",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "apiWallet",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "charity",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "charityFee",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_ticketPrice",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_maxTickets",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_endDate",
          type: "uint256",
        },
        {
          components: [
            {
              internalType: "address",
              name: "feeToken",
              type: "address",
            },
            {
              internalType: "address",
              name: "charity",
              type: "address",
            },
            {
              internalType: "address payable",
              name: "affiliateWallet",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "creatorFee",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "charityFee",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "affiliateFee",
              type: "uint256",
            },
          ],
          internalType: "struct LotteryFactory.LotteryFee",
          name: "_feeParams",
          type: "tuple",
        },
        {
          internalType: "uint256",
          name: "_maxTicketsPerWallet",
          type: "uint256",
        },
        {
          internalType: "uint256[]",
          name: "_prizeDistribution",
          type: "uint256[]",
        },
      ],
      name: "createLottery",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "creationFee",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "creatorFee",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "endDate",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "feeToken",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "isWhitelisted",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "lotteries",
      outputs: [
        {
          internalType: "contract Lottery",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxTickets",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxTicketsPerWallet",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxWinners",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "prizeDistribution",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_affiliateFee",
          type: "uint256",
        },
      ],
      name: "setAffiliateFeeOnCreate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_apiWallet",
          type: "address",
        },
      ],
      name: "setApiAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_creationFee",
          type: "uint256",
        },
      ],
      name: "setCreationFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_feeAddress",
          type: "address",
        },
      ],
      name: "setPlatformAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_platfomFee",
          type: "uint256",
        },
      ],
      name: "setPlatformFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "startTime",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "ticketPrice",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_address",
          type: "address",
        },
        {
          internalType: "bool",
          name: "_status",
          type: "bool",
        },
      ],
      name: "whitelistAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_addresses",
          type: "address[]",
        },
        {
          internalType: "bool[]",
          name: "_statuses",
          type: "bool[]",
        },
      ],
      name: "whitelistAddresses",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawEther",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract IERC20",
          name: "_token",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_beneficiary",
          type: "address",
        },
      ],
      name: "withdrawtoken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const updateImage = async (add) => {
    let hash =
      "0x061e755724edecc193c4dd76b7749444bd085f04d0a8b5eed32902f3e712c0f9";
    provider.getTransaction(hash).then((receipt) => {
      console.log(receipt);
    });
    let url = `https://api.lucky1.io/updateImage`;
    const { data } = await axios.post(url, {
      // lotteryAddress: receipt.events[0].args.lottery,
      lotteryAddress: add,
      image: imgurl,
    });
    console.log(data);
    // window.open(`${window.location.origin}/profile/${address}`)
  };

  let factoryContract = "0xF2266dACaB52B90CdD00dDA7A486517CEa23F7aD";
  // let factoryContract = "0x6A1dEB92664Caa00bc58a2A7286Dd3a998DC5F07";
  const { address } = useAccount();
  const { open } = useWeb3Modal();

  let signer2 = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  let factory = new ethers.Contract(factoryContract, factoryABI, signer);

  const newLottery = async () => {
    console.log(values);
    const lotteryFee = {
      feeToken: values.FeeToken,
      charity: values.charityAddress,
      affiliateWallet:
        values.affiliateAddress || "0x0000000000000000000000000000000000000000",
      creatorFee: values.CreatorFee,
      charityFee: values.charityFee,
      affiliateFee: values.affiliateFee,
    };
    console.log(lotteryFee);

    setShowLoader(true);
    let tx;
    try {
      tx = await factory.createLottery(
        values.lotteryName,
        ethers.utils.parseEther(values.entranceFee),
        values.numberofTickets,
        // //convert date to epoch time
        new Date(values.lottryEndDate).getTime() / 1000,
        lotteryFee,
        values.maxTicketPerWallet,
        values.prizeDistribution // Convert prize distribution percentages to numbers
      );
    } catch (error) {
      console.log(error);
      setShowLoader(false);
    }

    let sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    let receipt = await tx.wait();

    if (receipt) {
      //direct to profile page
      setShowLoader(false);
      console.log(receipt);
      let lotteryAddress = receipt.events[3].args.lottery;
      setLotteryAddress(lotteryAddress);
      await sleep(1000);
      // updateImage(receipt.events[0].args.lottery);
      await sleep(1000);
      alert(
        "*** Lottery Created Successfully ***Congratulations! Your lottery has been created.Please remember to add a description and image to enhance your lottery listing.Good luck!"
      );
      if (values.entranceFee === "0") setShowPrizeAmountModal(true);
      else {
        navigate(`/${lotteryAddress}`, { state: { createdNow: true } });
      }
    }
  };

  const depositPrizeAmount = async () => {
    console.log(
      "deposit funds",
      prizeAmount,
      ethers.utils.parseEther(prizeAmount).toString()
    );
    if (lotteryAddress === "") return;

    let feeToken = new ethers.Contract(values.FeeToken, erc20Abi, signer);
    try {
      setShowLoader(true);
      let tx = await feeToken.transfer(
        lotteryAddress,
        ethers.utils.parseEther(prizeAmount)
      );

      let receipt = await tx.wait();

      if (receipt) {
        setShowLoader(false);
        setShowPrizeAmountModal(false);
        alert("Prize Amount Deposited successfully!");
        window.open(`${window.location.origin}/profile/${address}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let buttonTitle = () => {
    if (!address) {
      return {
        title: "Connect Wallet",
        func: open,
      };
    } else {
      return {
        title: "Create Lottery",
        func: newLottery,
      };
    }
  };
  const b = buttonTitle();
  const [disable, setDisable] = React.useState(true);
  const [values, setValues] = useState({
    lotteryName: "Lucky1 Lottery",
    lottrySymbol: "LUCKY",
    entranceFee: "30",

    lottryEndDate: "",

    charityAddress: "0x62cEFa2920Aa80D67e38C00A84723b3Fc9fA866B",
    FeeToken: "0x55d398326f99059fF775485246999027B3197955",
    CreatorFee: "15",
    charityFee: "0",
    numberofTickets: "100",
    maxTicketPerWallet: "1", // Preset to 1
    prizeDistribution: ["50", "50"],
    affiliateFee: "0",
    affiliateAddress: "0x0000000000000000000000000000000000000000",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      icon: textIcon,
      label: "Lottery name",
      type: "text",
      name: "lotteryName",
      placeholder: "Enter name",
      onChange: onChange,
    },
    {
      icon: dollar,
      label: "Entrance Fee",
      labelExplainer: "Price of 1 ticket, in your Fee Token, e.g = 10",
      type: "text",
      min: 1,
      name: "entranceFee",
      placeholder: "Enter entrance fee",
      onChange: onChange,
    },

    // {
    //   icon: usdt,
    //   label: "Lottery Symbol",
    //   type: "text",
    //   name: "lottrySymbol",
    //   placeholder: "Enter symbol",
    // },
    {
      icon: usdt,
      label: "Fee Token",
      type: "text",
      labelExplainer:
        "Your lottery tickets will only be purchased in this token",
      name: "FeeToken",
      placeholder: "Enter token to pay fee",
      onChange: onChange,
    },
    {
      icon: usdt,
      label: "Creator Fee",
      labelExplainer:
        "Lottery creator’s fee to be rewarded for creating this lottery",
      type: "text",
      name: "CreatorFee",
      placeholder: "Enter creator fee",
      onChange: onChange,
    },
    {
      icon: calender,
      label: "lottery end date",
      type: "datetime-local",
      name: "lottryEndDate",

      placeholder: "Enter date",
      onChange: onChange,
    },

    {
      icon: winner,
      label: "Number of tickets",
      labelExplainer: "Total number of tickets to be sold for this lottery",
      type: "number",
      min: 1,
      name: "numberofTickets",
      placeholder: "Enter number of Tickets",
      onChange: onChange,
    },
    // {
    //   icon: winner,
    //   label: "Lottery Password",
    //   type: "password",
    //   min: 1,
    //   name: "password",
    //   placeholder: "Enter password",
    //   switchs: true,
    //   disable: disable,
    //   setDisable: setDisable,
    // },
    // Prize Distribution
    {
      icon: dollar,
      label: "Prize Distribution",
      labelExplainer: "In % e.g : 1 Winner=100, 2winner= 50,50",
      type: "text", // Use "text" type to allow comma-separated input
      name: "prizeDistribution",
      placeholder: "Enter prize distribution (comma-separated percentages)",
      onChange: (e) => {
        const inputValues = e.target.value;
        const parsedDistribution = inputValues
          .split(",")
          .map((value) => value.trim());

        setValues({
          ...values,
          prizeDistribution: parsedDistribution,
          formattedPrizeDistribution: `[${parsedDistribution.join(",")}]`,
        });
      },
    },
    // Max Ticket Per Wallet
    {
      icon: winner,
      label: "Max Ticket Per Wallet",
      labelExplainer:
        "Maximum number of ticket a wallet can purchase for this lottery",
      type: "number",
      min: 1,
      name: "maxTicketPerWallet",
      placeholder: "Enter max ticket per wallet",
      preset: "1",
      switchs: true,
      disable: disable,
      setDisable: setDisable,
      onChange: (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      },
    },
    {
      icon: dollar,
      label: "Charity Fee",
      labelExplainer:
        "The % of the lottery revenue that you want to share with a charity",
      type: "text",
      min: 1,
      name: "charityFee",
      placeholder: "Enter charity fee",
      switchs: true,
      disable: disable,
      setDisable: setDisable,
      onChange: onChange,
    },
    {
      icon: winner,
      label: "Charity Address",
      type: "text",
      name: "charityAddress",
      placeholder: "Enter address",
      switchs: true,
      disable: disable,
      setDisable: setDisable,
      onChange: onChange,
    },
    {
      icon: dollar,
      label: "Affiliate Fee",
      labelExplainer:
        "Reward commission for those referring your project to others",
      type: "text",
      min: 1,
      name: "affiliateFee",
      placeholder: "Enter affiliate fee",
      switchs: true,
      disable: disable,
      setDisable: setDisable,
      onChange: onChange,
    },
  ];

  return (
    <section className={styles.createLotteryContainer}>
      <div className="container">
        <div className={styles.headingContainer}>
          <h2 className={styles.title}>Create lottery</h2>
          <p className={styles.text}>
            In the section, you can quickly filter and select lotteries based on
            the details of your needs
          </p>
        </div>
        <div className={styles.wrapper}>
          <form className={styles.details}>
            <div className={styles.inputWrapper}>
              {inputs.map((input, i) => (
                <Input {...input} key={i} value={values[input.name]} />
              ))}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                b.func();
              }}
              className={styles.button}
            >
              {b.title}
            </button>
          </form>
        </div>
      </div>
      {showPrizeAmountModal && (
        <SetPrizeAmountModal
          setModal={setShowPrizeAmountModal}
          prizeAmount={prizeAmount}
          setPrizeAmount={setPrizeAmount}
          depositPrizeAmount={depositPrizeAmount}
        />
      )}
      <Loader show={showLoader} />
    </section>
  );
};

export default CreateLottery;

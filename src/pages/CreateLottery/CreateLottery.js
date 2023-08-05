import React, { useState } from "react";
import Input from "../../components/CreateLottery/Input/Input";
import { textIcon, dollar, usdt, calender, winner } from "../../images/images";
import styles from "./styles.module.css";

import axios from "axios";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useSigner } from "wagmi";

const CreateLottery = () => {
  const { data: signer } = useSigner();
  const [imgurl, setImgurl] = useState("");

  React.useEffect(() => {
    console.log(imgurl);
    updateImage("0xC822B224981983B6c5606c1a743E41d2E56F7c18");
  }, [imgurl]);

  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let factoryABI = [
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "symbol",
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
          name: "_maxWinners",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_endDate",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "charity",
          type: "address",
        },
        {
          internalType: "address",
          name: "_feeToken",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_creatorFee",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_charityFee",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_startTime",
          type: "uint256",
        },
      ],
      name: "createLottery",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
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
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "symbol",
          type: "string",
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
          name: "maxWinners",
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
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
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



  let factoryContract = "0xF27c7A96C5316DDe899b2f246C97677549031E9E";
  const { address } = useAccount();
  const { open } = useWeb3Modal();

  let signer2 = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  let factory = new ethers.Contract(factoryContract, factoryABI, signer);

  const newLottery = async () => {
    let tx = await factory.createLottery(
      values.lotteryName,
      "Lucky1",
      ethers.utils.parseEther(values.entranceFee),
      values.numberofTickets,
      values.numberofWinners,
      // //convert date to epoch time
      new Date(values.lottryEndDate).getTime() / 1000,
      "0x62cEFa2920Aa80D67e38C00A84723b3Fc9fA866B",
      values.FeeToken,
      values.CreatorFee,
      values.charityFee,
      new Date(values.LotteryStartDate).getTime() / 1000
    );

    let sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    let receipt = await tx.wait();

    if (receipt) {
      //direct to profile page
      console.log(receipt);
      let lotteryAddress = receipt.events[1].args.lottery;
      console.log(lotteryAddress);
      await sleep(1000);
      updateImage(receipt.events[0].args.lottery);
      await sleep(1000);
      alert("*** Lottery Created Successfully ***Congratulations! Your lottery has been created.Please remember to add a description and image to enhance your lottery listing.Good luck!");
      window.open(`${window.location.origin}/profile/${address}`);
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
        title: "Create Lottery - 0.1 tBNB",
        func: newLottery,
      };
    }
  };
  const b = buttonTitle();
  const [disable, setDisable] = React.useState(true);
  const [values, setValues] = useState({
    lotteryName: "Sigma Lottery",
    lottrySymbol: "SML",
    lotteryPrize: "3000",
    entranceFee: "30",
    lottryEndDate: "",
    numberofWinners: "1",
    charityAddress: "0x62cEFa2920Aa80D67e38C00A84723b3Fc9fA866B",
    FeeToken: "0x55d398326f99059fF775485246999027B3197955",
    CreatorFee: "15",
    charityFee: "0",
    password: "",
    numberofTickets: "1",
    prizeDistribution: "50,50",
    maxTicketPerWallet: "1", // Preset to 1
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
      name: "FeeToken",
      placeholder: "Enter token to pay fee",
      onChange: onChange,
    },

    {
      icon: winner,
      label: "Number of winners",
      type: "number",
      min: 1,
      name: "numberofWinners",
      placeholder: "Enter number",
      onChange: onChange,
    },
    {
      icon: usdt,
      label: "Creator Fee",
      type: "text",
      name: "CreatorFee",
      placeholder: "Enter creator fee",
      onChange: onChange,
    },

    {
      icon: calender,
      label: "lottery Start Date",
      type: "datetime-local",
      name: "LotteryStartDate",
      placeholder: "Enter date",
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
      type: "text",
      name: "prizeDistribution",
      placeholder: "Enter prize distribution",
      preset: "50,50",
      switchs: true,
      disable: disable,
      setDisable: setDisable,
      onChange: (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      },
    },
    // Max Ticket Per Wallet
    {
      icon: winner,
      label: "Max Ticket Per Wallet",
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
    </section>
  );
};

export default CreateLottery;

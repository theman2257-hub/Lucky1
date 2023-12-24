import React from "react";
import axios from "axios";
import Counter from "../../Counter/Counter/Counter";
import styles from "./styles.module.css";
import { ethers } from "ethers";
import { useSigner, useEnsName, useNetwork } from "wagmi";
import { getClient } from "../../Utils/graphClient";
let abierc = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "issuer",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "value", type: "bool" },
    ],
    name: "IssuerRights",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
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
    name: "TransferOwnership",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_spender", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "burn",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_from", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "burnFrom",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isIssuer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_issuer", type: "address" },
      { internalType: "bool", name: "_value", type: "bool" },
    ],
    name: "setIssuerRights",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_from", type: "address" },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
let rpc = "https://bsc-dataseed1.binance.org/";
let provider = new ethers.providers.JsonRpcProvider(rpc);
const Cards = ({
  endDate,
  image,
  name,
  ticketPrice,
  to,
  lotteryAddress,
  maxTickets,
  tokenSymbol,
  feeToken,
}) => {
  const date = new Date(endDate * 1000);
  const pastDate = new Date(
    1970,
    0,
    1,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
  const [prizeAmount, setPrizeAmount] = React.useState(0.0);
  const [totalTicketsPurchased, setTotalPurchased] = React.useState(0);
  const { data } = useSigner();
  let rpc = "https://bsc-dataseed1.binance.org/";
  const { chain } = useNetwork();

  // getSymbol(lotteryAddress).then((res) => {
  //   console.log(res)
  //   setSym(res)
  // });
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

  const pastDateString = pastDate
    .toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(",", "");

  React.useEffect(() => {
    const getTotalTicketsPurchased = async () => {
      let query = `
      {
        ticketPurchaseds(where:{lotteryAddress:"${lotteryAddress}"}) {
          amount
        }
      }`;

      const client = getClient(chain.name);
      const { data } = await client.query(query).toPromise();

      let totalPurchased = 0;
      data.ticketPurchaseds.map((item) => {
        totalPurchased += parseInt(item.amount);
      });
      console.log(totalPurchased);

      setTotalPurchased(totalPurchased);
      // setLotteryDetails(lotteryData);
    };

    const getLotteryBalance = async () => {
      let feeTokenContract = new ethers.Contract(feeToken, abierc, provider);

      try {
        let res = await feeTokenContract.balanceOf(lotteryAddress);
        setPrizeAmount(ethers.utils.formatEther(res.toString()).toString());
      } catch (error) {}
    };

    if (ticketPrice === "0") {
      getLotteryBalance();
      getTotalTicketsPurchased();
    }
  }, []);

  return (
    <>
      <div
        className={styles.card}
        onClick={() => {
          //open base url + lottery address
          //i dont want to hardcode the base url
          //so i will use the window.location.origin
          //to get the base url
          // window.open(`${window.location.origin}/${lotteryAddress}`)

          //open in same tab

          window.location.href = `/${chain?.id || 56}/${lotteryAddress}`;
        }}
      >
        <div className={styles.counter}>
          <Counter
            time={
              maxTickets - totalTicketsPurchased > 0
                ? dateString
                : pastDateString
            }
          />
        </div>
        <img
          onError={(ev) => {
            ev.target.src = "https://i.ibb.co/QmfT760/Untitled-500-500-px.png";
          }}
          src={`https://api.lucky1.io/images/${lotteryAddress}.png`}
          alt="#"
          className={styles.image}
        />
        {/* <p className={styles.name}>{name}</p> */}
        <p className={styles.name}>
          {" "}
          {ticketPrice !== "0"
            ? Number(ticketPrice * (maxTickets / 10 ** 18)).toFixed(2)
            : prizeAmount}{" "}
          {tokenSymbol}
        </p>
        <div className={styles.price}>
          <p className={styles.key}>{name}</p>
          <p className={styles.value}>
            {" "}
            <span className={styles.usd}>
              {" "}
              {/* (${parseInt(ethers.utils.formatEther(ticketPrice)).toFixed(2)}) */}
            </span>{" "}
            <span className={styles.eth}>
              {/* {parseInt(ethers.utils.formatEther(ticketPrice)).toFixed(2)} USD */}
            </span>
          </p>
        </div>
        <a
          onClick={() => {
            //open base url + chain id + lottery address
            //i dont want to hardcode the base url
            //so i will use the window.location.origin
            //to get the base url
            // window.open(`${window.location.origin}/${lotteryAddress}`)

            //

            //open in same tab
            window.location.href = `/${chain.id}/${lotteryAddress}`;
          }}
          className={styles.button}
        >
          View Lottery
        </a>
      </div>
    </>
  );
};

export default Cards;

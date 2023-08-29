import React from "react";

import Counter from "../../Counter/Counter/Counter";
import styles from "./styles.module.css";
import { ethers } from "ethers";
import { useEnsName } from "wagmi";
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

const Cards = ({
  endDate,
  image,
  name,
  ticketPrice,
  to,
  lotteryAddress,
  maxTickets,
  tokenSymbol,
}) => {
  const date = new Date(endDate * 1000);
  const [sym, setSym] = React.useState();
  let rpc = "https://bsc-dataseed1.binance.org/";

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

          window.location.href = `/${lotteryAddress}`;
        }}
      >
        <div className={styles.counter}>
          <Counter time={dateString} />
        </div>
        <img
          onError={(ev) => {
            ev.target.src = "https://i.ibb.co/QmfT760/Untitled-500-500-px.png";
          }}
          src={`https://api.lucky1.io/images/${lotteryAddress}.png?32437828`}
          alt="#"
          className={styles.image}
        />
        {/* <p className={styles.name}>{name}</p> */}
        <p className={styles.name}>
          {" "}
          {Number(ticketPrice * (maxTickets / 10 ** 18)).toFixed(2)}{" "}
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
            //open base url + lottery address
            //i dont want to hardcode the base url
            //so i will use the window.location.origin
            //to get the base url
            // window.open(`${window.location.origin}/${lotteryAddress}`)

            //open in same tab

            window.location.href = `/${lotteryAddress}`;
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

import React, { useState } from "react";
import {
  item,
  likeIcon,
  blockchain,
  category,
  collection,
  saleType,
  dateAdded,
} from "../../../images/images";
import Card from "./Card/Card";
import styles from "./AllItems.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAccount } from "wagmi";
import Cards from "../../ExpoloreLotteryCards/Cards/Cards";

const AllItems = ({ setCreatedCount, participatedItems, setCreatedCountparticipatedItems, setParticipatedItems }) => {
  const { address } = useAccount();
  const [userInfo, setUserInfo] = React.useState({
    _id: "64283390f049ad247602444c",
    name: "null",
    twitter: "null",
    telegram: "null",
    followers: "0",
    items: 0,
    wallet: "null",
    following: "0",
  });
  const [useritems, setUserItems] = React.useState([]);
  const [participated, setParticipated] = useState([]);


  const { id } = useParams();
  let url = `https://api.lucky1.io/tickets/users/${id}`;
  const getUserInfo = async () => {
    let query = `{
      lotteries(where: {creator: "${id}"}) {
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
    let url = "https://api.thegraph.com/subgraphs/name/theman2257-hub/lucky1final";
    try {
      const { data } = await axios.post(url, { query });
      let lot = (data.data.lotteries)
      console.log(lot)
      setUserItems(lot);
      setCreatedCount(lot.length);
      // setUserInfo(data.data.lotteries);
      // setUserItems(data.useritems);
    } catch (error) {
    }
  };

  const getParticipated = async () => {
    let u = `https://api.lucky1.io/tickets/participated/${id}`;
    try {
      const { data } = await axios.get(u);
      setParticipated(data);
      // setParticipatedItems(data);

    } catch (error) {
    }
  }
  React.useEffect(() => {
    getUserInfo();
    getParticipated();
  }, [id]);
  const items = [
    {
      title: "Lucky 1",
      img: item,
      price: {
        eth: 0.45,
      },
      like: 99,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.buttons}>

        </div>
        <div className={styles.allItems}>
          {participatedItems
            ? participated.map((el, i) => <Cards key={i} {...el} />)
            : useritems.map((el, i) => <Cards key={i} {...el} />)}
        </div>
      </div>
    </div>
  );
};

export default AllItems;

import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

import { eth, flow, xtz, likeIcon } from "../../../../images/images";
import styles from "./Card.module.css";
import { ethers } from "ethers";

const Card = ({ name, ticketPrice, like, image, lotteryAddress, tokenSymbol, maxTickets }) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className={styles.card} onClick={
      () => {
        //open base url + lottery address
        //i dont want to hardcode the base url
        //so i will use the window.location.origin
        //to get the base url
        window.open(`${window.location.origin}/${lotteryAddress}`)
      }
    }>
      <div className={styles.moreContainer}>
        <FiMoreHorizontal className={styles.more} />
      </div>
      <img src={image} alt="" className={styles.image} />
      <p onClick={
        () => {
          //open base url + lottery address
          //i dont want to hardcode the base url
          //so i will use the window.location.origin
          //to get the base url
          window.open(`${window.location.origin}/${lotteryAddress}`)
        }
      } className={styles.title}>{name}</p>
      <div className={styles.spaceBetween}>
        <div className={styles.priceContainer}>
          <img src={eth} alt="#" className={styles.icon} />
          <span className={styles.from}></span>
          <span className={styles.price}>{Number (ethers.utils.formatEther(ticketPrice)) * maxTickets} {tokenSymbol}</span>
        </div>
        <p className={styles.like}>
          {" "}
          {liked ? (
            <HiHeart
              className={styles.likeIcon}
              onClick={() => setLiked((prev) => !prev)}
            />
          ) : (
            <HiOutlineHeart
              className={styles.likeIcon}
              onClick={() => setLiked((prev) => !prev)}
            />
          )}
          {liked ? 99 + 1 : 99}
        </p>
      </div>
    </div>
  );
};

export default Card;

import React from "react";
import { banner } from "../../../images/images";
import { FaEthereum, FaTwitter } from "react-icons/fa";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";

const Banner = () => {
  const { id } = useParams();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {" "}
        <div className={styles.bannerContainer}>
          <img src={banner} alt="#" className={styles.banner} />
          <div className={styles.infoContainer}>
            {/* <a href="www.twitter.com" target="_blank" className={styles.info}>
              <FaTwitter className={[styles.icon, styles.twitter].join(" ")} />
              <p className={styles.text}>@akarana.w</p>
            </a>{" "} */}
            <div className={styles.info}>
              <FaEthereum className={[styles.icon, styles.eth].join(" ")} />
              <p className={styles.text}>{id.slice(0, 6) + "...." + id.slice(-4)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

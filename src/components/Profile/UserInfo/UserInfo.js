import React, { useState } from "react";
import { ImUsers, ImArrowUpRight2 } from "react-icons/im";
import { MdVerified } from "react-icons/md";

import { FiMoreHorizontal } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { FaAdjust, FaTwitter } from "react-icons/fa";
import { userImage } from "../../../images/images";
import styles from "./UserInfo.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAccount } from "wagmi";

const UserInfo = ({ createdCount, participatedItems, setParticipatedItems }) => {
  const { address } = useAccount();
  const [userInfo, setUserInfo] = React.useState({
    _id: "64283390f049ad247602444c",
    name: "null",
    twitter: "null",
    telegram: "null",
    followers: 0,
    items: 0,
    wallet: "null",
    following: "0",
  });
  const [useritems, setUserItems] = React.useState([]);
  const { id } = useParams();
  let url = `https://api.lucky1.io/tickets/users/${id}`;
  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(url);

      if (data.useritems === undefined) {
        return;
      }
      if (data.user === undefined) {
        return;
      }
      //
      if (data.user != null) {
        setUserInfo(data.user);
      }
      setUserItems(data.useritems);
    } catch (error) {
    }
  };
  React.useEffect(() => {
    getUserInfo();
  }, [id]);
  const info = [
    { key: "Lotteries Participated", value: participatedItems.length ? participatedItems.length : 0 },
    // { key: "following", value: userInfo.following ? userInfo.following : 0 },
    { key: "Lotteries Created", value: createdCount },
  ];

  function getName() {
    if (userInfo.name == "null" && !id) {
      return "null"
    } else if (userInfo.name == "null" && address) {
      return id.slice(0, 6) + "..." + id.slice(-4)
    } else {
      return userInfo.name
    }
  }
  const name = getName()
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.infoWrapper}>
            <div className={styles.nameAndImage}>
              <img src={userImage} alt="#" className={styles.userImage} />
              <h4 className={styles.userName}>
                {name} {userInfo.name != "null" && <MdVerified className={styles.verified} />}
              </h4>
            </div>
            <div className={styles.info}>
              {info.map((el, i) => (
                <p className={styles.text} key={i}>
                  {" "}
                  <span className={styles.value}>{el.value}</span> {"  "}
                  <span className={styles.key}>{el.key}</span>
                </p>
              ))}
            </div>
            <div className={styles.buttonContainer}>
              {userInfo.name != "null" && <div className={[styles.button, styles.activeButton].join(" ")}>
                <FaTwitter className={styles.icon} /> Twitter
              </div>}
              {userInfo.name == "null" && <div className={[styles.button, styles.activeButton].join(" ")}>
                <FaAdjust className={styles.icon} /> Create Profile
              </div>}
              {/* <div className={[styles.button].join(" ")}>
                <HiOutlineMail className={styles.icon} /> Message
              </div> */}
              <div className={[styles.button, styles.send].join(" ")}>
                <ImArrowUpRight2 className={styles.icon} />
              </div>{" "}
              <div className={[styles.button, styles.more].join(" ")}>
                <FiMoreHorizontal className={styles.icon} />
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className={styles.itemsCategory}>
        <div
          className={[
            styles.created,
            !participatedItems && styles.activeItems,
          ].join(" ")}
          onClick={() => setParticipatedItems(false)}
        >
          Created
        </div>
        <div
          className={[
            styles.participated,
            participatedItems && styles.activeItems,
          ].join(" ")}
          onClick={() => setParticipatedItems(true)}
        >
          Participated
        </div>
      </div>
    </>
  );
};

export default UserInfo;

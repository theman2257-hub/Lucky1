import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import styles from "./Modal.module.css";
import { middleStar, userImage } from "../../../images/images";

const CompetitionEnded = ({ numberOfWinners, setModal, hash }) => {
  const [winnerNumber, setWinnerNumbers] = useState("");
  const handleKeyDown = (event) => {
    if (event.key !== "Backspace" && !/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };
  return (
    <>
      <div className={styles.modal}>
        {" "}
        <div className={styles.wrapper}>
          {/* <div className={styles.header}>
            <h2 className={styles.title}>Competition Ended</h2>
            <div
              className={styles.iconContainer}
              onClick={() => setModal(false)}
            >
              <MdClose className={styles.icon} />
            </div>
          </div> */}
          <p className={styles.text}>
            Lottery is over!
          </p>
          <div className={styles.form}>
            <p className={[styles.text, styles.day].join(" ")}>Finalized</p>
            <div className={styles.info}>
              <span className={styles.tagline}>Won by </span>
              <img src={userImage} alt="#" className={styles.user} />
              <span className={[styles.tagline, styles.type].join(" ")}>
                {numberOfWinners} user
              </span>
            </div>{" "}
            <button
              onClick={() => {
                window.open("https://bscscan.com/tx/" + hash, "_blank");
              }}
              className={styles.button}>View Tx</button>
            <button
              className={styles.button}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Browse Competition
            </button>
          </div>
        </div>
      </div>
      <div className={styles.overlay} onClick={() => {
        window.location.href = "/";
      }}></div>
    </>
  );
};

export default CompetitionEnded;

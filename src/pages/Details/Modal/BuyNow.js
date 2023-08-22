import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import styles from "./Modal.module.css";
import { middleStar } from "../../../images/images";
import AddWhitelistModal from "../../../components/Details/NftDescription/AddWhitelistModal/AddWhitelistModal";
import AddDescriptionModal from "../../../components/Details/NftDescription/AddDescriptionModal/AddDescriptionModal";

const Modal = ({ setModal, setCompetitionEndedModal }) => {
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
          <div className={styles.header}>
            <h2 className={styles.title}>Password Protected Lottery</h2>
            <div
              className={styles.iconContainer}
              onClick={() => setModal(false)}
            >
              <MdClose className={styles.icon} />
            </div>
          </div>
          <p className={styles.text}>
            Enter Password to buy ticket
          </p>
          <form action="" className={styles.form}>
            <div className={`${styles.inputContainer}`}>
              <label
                htmlFor="numberOfwinners"
                className={`${styles.label} ${styles.text}`}
              >
                Enter Lottery Password
              </label>
              <div className={` ${styles.inputAndIcon} `}>
                <img src={middleStar} alt="#" className={styles.icon} />
                <input
                  type="number"
                  id="numberOfWinners"
                  name="numberOfwinners"
                  value={winnerNumber}
                  className={`${styles.input} ${styles.text}`}
                  placeholder="Enter Passcode"
                  onChange={(e) => setWinnerNumbers(e.target.value)}
                  onKeyDown={handleKeyDown}
                  min={1}
                />
              </div>
            </div>
            <button
              className={styles.button}
              onClick={() => {
                setModal(false);
                setCompetitionEndedModal(true);
              }}
            >
              Proceed
            </button>
          </form>
        </div>
      </div>
      <div className={styles.overlay} onClick={() => setModal(false)}></div>
      <AddDescriptionModal/>
    </>
  );
};

export default Modal;

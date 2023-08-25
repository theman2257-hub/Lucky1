import React, { useState } from "react";
import styles from "./NftDescription.module.css";
import AddDescriptionModal from "./AddDescriptionModal/AddDescriptionModal";
import AddWhitelistModal from "./AddWhitelistModal/AddWhitelistModal";

const NftDescription = ({
  lotteryAddress,
  creator,
  description,
  setDescription,
}) => {
  const [showList, setShowList] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [whitelistModal, setWhitelistModal] = useState(false);
  const data = [];

  // Function to handle the "Whitelist wallet" button click
  const handleAddWhitelist = () => {
    // Show the AddWhitelistModal when the "Whitelist wallet" button is clicked
    setWhitelistModal(true);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Lottery Description</h2>
        <p className={styles.text}>{description}</p>

        <div className={styles.buttonContainer}>
          {/* Add Description Button */}
          {description.length < 1 && (
            <button
              onClick={() => setDescriptionModal(true)}
              className={styles.button}
            >
              Add Description
            </button>
          )}

          {/* Add some space between the two buttons */}
          <div className={styles.buttonSpace} />

          {/* Whitelist wallet Button */}
          <button onClick={handleAddWhitelist} className={styles.button}>
            Whitelist wallet
          </button>
        </div>
        <div
          className={[
            styles.listBox,
            showList && styles.listBoxFull,
            showList && "grScrollbar",
          ].join(" ")}
          onMouseEnter={() => setShowList(true)}
        >
          {data.map((el, i) => (
            <p key={i} className={[styles.text, styles.listBoxText].join(" ")}>
              <span>{i + 1 > 9 ? i + 1 : `0${i + 1}`}.</span> <span>{el}</span>
            </p>
          ))}
        </div>
      </div>
      {descriptionModal && (
        <AddDescriptionModal
          creator={creator}
          setModal={setDescriptionModal}
          description={description}
          setDescription={setDescription}
        />
      )}
      {whitelistModal && (
        <AddWhitelistModal
          // Pass any necessary props to the AddWhitelistModal component
          // For example:
          lotteryAddress={lotteryAddress}
          creator={creator}
          setModal={setWhitelistModal}
        />
      )}
    </>
  );
};

export default NftDescription;

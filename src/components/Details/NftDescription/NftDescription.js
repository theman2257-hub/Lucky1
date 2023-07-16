import React, { useState } from "react";
import styles from "./NftDescription.module.css";
import AddDescriptionModal from "./AddDescriptionModal/AddDescriptionModal";

const NftDescription = ({ creator, description, setDescription }) => {
  const [showList, setShowList] = useState(false);
  const [modal, setModal] = useState(false);
  const data = [];
  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Lottery Description </h2>
        <p className={styles.text}>{description}</p>

        <div className={styles.buttonContainer}>
          {description.length < 1 && <button onClick={() => setModal(true)} className={styles.button}>
            Add Descripton
          </button>}
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
      {modal && (
        <AddDescriptionModal
          creator={creator}
          setModal={setModal}
          description={description}
          setDescription={setDescription}
        />
      )}
    </>
  );
};

export default NftDescription;

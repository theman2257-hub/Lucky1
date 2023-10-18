import React from "react";
import { MdClose } from "react-icons/md";
import styles from "./SetPrizeAmountModal.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import {
  textIcon,
  dollar,
  usdt,
  calender,
  winner,
} from "../../../images/images";
import Input from "../../../components/CreateLottery/Input/Input";

const SetPrizeAmountModal = ({
  setModal,
  prizeAmount,
  setPrizeAmount,
  depositPrizeAmount,
}) => {
  const { id } = useParams();
  let { address } = useAccount();
  const [value, setValue] = React.useState("");

  let url = "https://api.lucky1.io/updateDescription";

  const onChange = (e) => {
    setPrizeAmount(e.target.value);
  };
  const submit = async () => {
    // execute deposit transaction
    await depositPrizeAmount();
  };
  const input = {
    icon: textIcon,
    label: "Amount",
    type: "text",
    name: "prizeAmount",
    onChange: onChange,
  };

  return (
    <>
      <div className={styles.modal}>
        {" "}
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h2 className={styles.title}>Enter Prize Amount {prizeAmount}</h2>
            <div
              className={styles.iconContainer}
              onClick={() => {
                setModal(false);
              }}
            >
              <MdClose className={styles.icon} />
            </div>
          </div>

          <div className={styles.form}>
            <div className={` ${styles.inputAndIcon} `}>
              <Input {...input} value={prizeAmount} />
            </div>

            <button
              className={styles.button}
              onClick={async () => {
                // setModal(false);
                await submit();
              }}
            >
              Deposit
            </button>
          </div>
        </div>
      </div>
      <div className={styles.overlay} onClick={() => setModal(false)}></div>
    </>
  );
};

export default SetPrizeAmountModal;

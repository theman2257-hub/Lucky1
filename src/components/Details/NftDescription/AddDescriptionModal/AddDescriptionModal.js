import React from "react";
import { MdClose } from "react-icons/md";
import styles from "./AddDescriptionModal.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

const AddDescriptionModal = ({ creator, setModal, description, setDescription }) => {
  const { id } = useParams();
  let { address } = useAccount();

  console.log("creator", creator);
  console.log("address", address);
  let url = "https://api.lucky1.io/updateDescription";
  let data = {
    description: description,
    lotteryAddress: id,
  }

  const submit = async () => {
    if (ethers.utils.getAddress(address) != ethers.utils.getAddress(creator)) {
      alert("****Unauthorized Transaction **** This transaction can only be performed by the Lottery Creator");
      return;
    }
    const { data: res } = await axios.post(url, data);
    console.log(res);
    if (res.status == "ok") {
      alert("Description Updated Successfully");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className={styles.modal}>
        {" "}
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h2 className={styles.title}>Add Description</h2>
            <div
              className={styles.iconContainer}
              onClick={() => setModal(false)}
            >
              <MdClose className={styles.icon} />
            </div>
          </div>

          <form action="" className={styles.form}>

            <div className={` ${styles.inputAndIcon} `}>
              <textarea
                className={`${styles.input} ${styles.text}`}
                name="description"
                id="descrition"
                cols="30"
                rows="7"
                placeholder="Write Description..."
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <button
              className={styles.button}
              onClick={() => {
                setModal(false);
                submit();

              }}
            >
              Sumbit
            </button>
          </form>
        </div>
      </div>
      <div className={styles.overlay} onClick={() => setModal(false)}></div>
    </>
  );
};

export default AddDescriptionModal;

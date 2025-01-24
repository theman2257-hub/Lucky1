// AddWhitelistModal.js
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import styles from "./AddWhitelistModal.module.css";
import { ethers } from "ethers"; // Import ethers library
import { useAccount } from "wagmi";
import { lotteryABI } from "../../../../constants/abis/abi";

const AddWhitelistModal = ({
  lotteryAddress,
  contract,
  creator,
  setModal,
  onWhitelistAdded,
}) => {
  const { data } = useAccount();
  const [addresses, setAddresses] = useState("");
  const { address } = useAccount(); // Assuming useAccount() gives the user's address

  const handleAddWhitelist = async () => {
    // Check if the user is the lottery creator
    if (ethers.utils.getAddress(address) !== ethers.utils.getAddress(creator)) {
      alert(
        "****Unauthorized Transaction **** This transaction can only be performed by the Lottery Creator"
      );
      return;
    }

    const addressesArray = addresses
      .split(",")
      .map((address) => address.trim());
    const statusesArray = new Array(addressesArray.length).fill(true); // Assuming all addresses are to be whitelisted

    try {
      let contract = new ethers.Contract(lotteryAddress, lotteryABI, data);
      let tx = await contract.whitelistAddresses(addressesArray, statusesArray);
      let reciept = await tx.wait();
      if (reciept && reciept.status) {
        // Call the callback function to inform the parent component that whitelist has been updated
        onWhitelistAdded();
      }

      // Close the modal
      setModal(false);
    } catch (error) {
      console.error("Error whitelisting addresses:", error);
      // Handle error if needed (e.g., show an error message to the user)
    }
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h2 className={styles.title}>Whitelist wallet</h2>
            <div
              className={styles.iconContainer}
              onClick={() => setModal(false)}
            >
              <MdClose className={styles.icon} />
            </div>
          </div>
          <div className={styles.form}>
            <div className={styles.inputAndIcon}>
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                value={addresses}
                onChange={(e) => setAddresses(e.target.value)}
                placeholder="Enter wallet addresses (comma-separated)"
              />
            </div>
            <button className={styles.button} onClick={handleAddWhitelist}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className={styles.overlay} onClick={() => setModal(false)}></div>
    </>
  );
};

export default AddWhitelistModal;

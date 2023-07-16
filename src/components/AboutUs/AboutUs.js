import React from "react";
import styles from "./styles.module.css";

const AboutUs = () => {
  return (
    <div className={styles.aboutUsContainer}>
      <div className="container">
        <div className={styles.textContainer}>
          <div className={styles.aboutUsText}>
            <span>About us</span>
          </div>
          <h2 className={styles.title}>
            <span className={styles.italic}>Learn more</span>{" "}
            <span className={styles.normal}>about our blockchain</span>{" "}
            <span className={styles.italic}>lottery platform</span>
          </h2>
          <p className={styles.text}>
            We are a decentralized platform that utilizes blockchain technology to create a fair and transparent lottery system. Participants can purchase tickets with cryptocurrency and the lottery results are determined by smart contracts that are executed on the blockchain. This ensures that the process is tamper-proof and can be independently verified by anyone{" "}
          </p>
          <div className={styles.buttonContainer}>
            <button className={styles.activeButton}>
              <span className={styles.buttonText}>Learn more</span>
            </button>{" "}
            <button className={styles.button}>Contact us</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

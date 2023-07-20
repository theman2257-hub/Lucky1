import React from "react";
import { Link } from "react-router-dom";
import { CgArrowLongRight } from "react-icons/cg";
import styles from "./styles.module.css";

const HeroSection = () => {
  return (
    <section className={`${styles.heroSection}`}>
      <div className="container">
        <div className={styles.textContainer}>
          <h1 className={`${styles.title} ${styles.spaceAbove}`}>
            LUCKY1 <span className={styles.italic}>PROTOCOL </span> {" "}
          </h1>
          <h2 className={`${styles.subtitle} ${styles.colderWhite}`}>
            <p className={styles.text}>
              <strong style={{ fontSize: "24px" }}>
                <span>Create Lotteries,</span>{" "}
                <span> Buy Tickets</span>{" "}
                <span> and Win Big</span>{" "}
              </strong>
              {" "}
              <br/> on the ultimate decentralized crypto platform. <br/> Create your dreams or bet on your luck !<br/>  It's all in your hands!
              With Lucky1; <br/> everyone has a shot at becoming <br/> a Crypto Millionaire! 🚀🌟
            </p>
          </h2>
          
          <div className={styles.buttonContainer}>
            <span className={styles.buttonText}>Create a Lottery</span>
            <Link className={styles.buttonWrapper}>
              <p className={styles.button}>
                <CgArrowLongRight className={styles.arrow} />
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


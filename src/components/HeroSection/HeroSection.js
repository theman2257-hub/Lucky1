import React from "react";
import { Link } from "react-router-dom";
import { CgArrowLongRight } from "react-icons/cg";
import styles from "./styles.module.css";

const HeroSection = () => {
  return (
    <section className={`${styles.heroSection}`}>
      <div className="container">
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            Create <span className={styles.italic}>Your  </span> Own Lottery{" "}
            <span className={styles.italic}>In 1Minute!</span>
          </h1>
          <p className={styles.text}>
            Join the future of gaming and win big with our revolutionary lottery crypto platform. Experience unparalleled transparency, security, and excitement as you participate in the world's most advanced lottery system.{" "}
          </p>
          <div className={styles.buttonContainer}>
            <span className={styles.buttonText}>Find lotteries</span>
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

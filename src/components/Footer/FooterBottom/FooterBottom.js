import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import {FaTwitter} from 'react-icons/fa';
import {BsTelegram} from 'react-icons/bs'
const FooterBottom = () => {
  return (
    <div className={styles.footerBottom}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.items}>
          <Link className={styles.text} to='/privacy'>Privacy Policy</Link>

            <a href="#/" target="_blank" className={styles.text}>
            Patent (pending)
            </a>

            <p className={`${styles.copyRightText} ${styles.text}`}>
              © 2023 All rights reserved
            </p>
          </div>

          <div className={styles.socials}>
            <div className={styles.twitter}>
              <a href="https://twitter.com/@lucky1Protocol" className={styles.icon}> <FaTwitter /></a> 
            </div>
            <div className={styles.telegram}>
            <a href=" https://telegram.me/@lucky1Protocol" className={styles.icon}> <BsTelegram /></a> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;

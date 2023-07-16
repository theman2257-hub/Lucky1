import React from "react";
import { settings, web } from "../../../images/images";
import styles from "./styles.module.css";

const FooterBottom = () => {
  return (
    <div className={styles.footerBottom}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.items}>
            <a href="#/" target="_blank" className={styles.text}>
              Privacy Policy
            </a>
            <a href="#/" target="_blank" className={styles.text}>
              License
            </a>
            <a href="#/" target="_blank" className={styles.text}>
              API
            </a>
            <p className={`${styles.copyRightText} ${styles.text}`}>
              © 2021 All rights reserved
            </p>
          </div>

          <div className={styles.webAndSettings}>
            <div className={styles.web}>
              <p className={styles.text}>English</p>
              <img src={web} alt="#" className={styles.icon} />
            </div>
            <div className={styles.iconContainer}>
              <img src={settings} alt="#" className={styles.icon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;

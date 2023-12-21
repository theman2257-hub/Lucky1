import React from 'react';
import styles from "./style.module.css";
import Whitepaper from './whitePaper.pdf'
const HowitWorks = () => {
  return (
    <div className={styles.howItWorksContainer}>
  <div className={`container ${styles.container}`}>
    <div className={styles.textContainer}>
      <h2 className={styles.mainTitle}>How It Works</h2>

        <p className={styles.text}>For more information read our <a href={Whitepaper}>Whitepaper</a></p>

      <div className={styles.founders}>
        <h3 className={styles.title}>For Founders:</h3>
        <div className={styles.content}>
          <h2 className={styles.title}><span className={styles.italic}>Create a Lottery</span></h2>
          <p className={styles.text}>
            Establish a lottery using your token as the fee. Include an eye-catching graphic, affiliate commissions, creator fees, and a detailed description with links to your project's community and website.
          </p>
          <h4 className={styles.title}><span className={styles.italic}>Marketing Phase</span></h4>
          <p className={styles.text}> <span className={styles.subTitle}> Lucky1 Marketing : </span>  A dedicated Success Manager tailors your marketing, featuring AMAs and influencer channels.</p>
          <p className={styles.text}> <span className={styles.subTitle}> Marketing : </span> Founders promote the lottery to their community and partners through various channels.</p>
          <p className={styles.text}> <span className={styles.subTitle}>Analysis and Repetition : </span> After the first lottery, strategies are refined based on market feedback, scaling up prizes and ticket prices for greater exposure and success.</p>
        </div>
      </div>

      <div className={styles.investors}>
        <h3 className={styles.title}>For Investors:</h3>
        <div className={styles.content}>
          <h2 className={styles.title}><span className={styles.italic}>Choose a Lottery</span></h2>
          <p className={styles.text}>Buy tickets using the lottery's fee token, either directly or through conversion (fees may apply).</p>
          <h2 className={styles.title}><span className={styles.italic}>Affiliate Program</span></h2>
          <p className={styles.text}>Share your participation using your unique affiliate link, formatted as Lucky1.io/Lotteryaddress/yourwalletaddress. Earn commissions on ticket sales and a bonus for referring winning friends.</p>
          <h2 className={styles.title}><span className={styles.italic}>Repeated Participation</span></h2>
          <p className={styles.text}>Regular involvement increases the chances of winning significant prizes.</p>
          <p className={styles.text}>This structure provides a comprehensive guide for both founders and investors, detailing the process of participating in and benefiting from the crypto lottery platform.</p>
          <p className={styles.text}>This structure provides a clear, step-by-step guide for both founders and investors to achieve success in the crypto lottery space.</p>
        </div>
      </div>
    </div>
  </div>
</div>

   
  );
};

export default HowitWorks;

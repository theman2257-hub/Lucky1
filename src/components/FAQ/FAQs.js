import React from 'react';
import styles from "./style.module.css";
import Whitepaper from './whitePaper.pdf';
import { Link } from 'react-router-dom';

const FAQs = () => {
  return (
    <div className={styles.faqContainer}>

     <div className='container'>
     <div className={styles.textContainer} >
      <h2 className={styles.title}>Frequently Asked Questions</h2>

      <div className="faq">
        <h3 className={styles.title}>Q: What is Lucky1 Protocol?</h3>
        <p className={styles.text}>
          A: Lucky1 Protocol is a decentralized platform designed to revolutionize the lottery system in the crypto space. It leverages blockchain technology to offer a transparent, secure, and fair lottery experience. The protocol allows users to create and participate in lotteries using cryptocurrency, ensuring anonymity and efficiency. It's tailored for both project founders and investors, providing a unique opportunity to engage with the crypto community, support projects, and potentially earn rewards through participation in various lottery events.
        </p>
        <p className={styles.text}>
          Check out the <a href={Whitepaper}>Whitepaper</a> for more info on the different roles played by Lucky1 Protocol.
        </p>
      </div>

      <div className="faq">
        <h3 className={styles.title}>Q: How do I use Lucky1 Protocol?</h3>
        <p className={styles.text}>
          A: Using Lucky1 Protocol involves simple steps. First, connect your cryptocurrency wallet to the platform. Next, choose a blockchain network where you wish to participate. You can create or enter lotteries by navigating to the respective sections. For lottery creation, you'll define parameters like lottery name, fee token, end date, prize distribution, and more. As a participant, you can browse active lotteries, view their details, and purchase tickets. Lucky1's intuitive interface makes both creating and participating in crypto lotteries straightforward and secure.
        </p>
        <p className={styles.text}>
          Check out our <Link className={styles.text} to='/userGuide'> " User Guide " </Link> section for more detail.
        </p>
      </div>

      <div className="faq">
        <h3 className={styles.title}>Q: How does Lucky1 Protocol work?</h3>
        <p className={styles.text}>
          A: Lucky1 Protocol operates on blockchain technology, ensuring a transparent and secure lottery experience. Founders can create lotteries by setting parameters like the fee token, ticket price, and prize structure. Participants can join by purchasing tickets using the specified token. The platform automates the lottery process, from ticket sales to prize distribution, and incorporates features like affiliate programs and charity donations. The decentralized nature guarantees fairness and integrity in the outcomes of the lotteries.
        </p>
        <p className={styles.text}>
          Check out our <Link className={styles.text} to='/HowItWorks'>“How it works”</Link>  section for more detail.
        </p>
      </div>

      </div>
      </div>
    </div>
  );
};

export default FAQs;

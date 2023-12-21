import React from 'react';
import styles from "./style.module.css";
import Bruce from '../../images/bruce.png'
import Darious from '../../images/darious.png'
import TheMan from '../../images/theMan.png'
const About = () => {
  return (
    <div className={styles.aboutContainer}>
    
    <div className='container'>
    <div className={styles.textContainer} >
    <h2 className={styles.mainTitle}>About Us</h2>
      <div className="mission">
        <h2 className={styles.title}>Mission Statement : </h2>
        <p className={styles.text}>
         
         <span className={styles.italic}> Lucky1 exists to elevate crypto projects from uncertainty to success and transform investors into winners in the crypto landscape.</span>
         
         <p> 
         <br/>
           Our mission is to be a transformative force in the cryptocurrency domain and a disruptive force, elevating projects from the challenges of financial uncertainty to the heights of market success. We strive to create a thriving ecosystem where project founders, our guiding stars, can effectively connect with and engage their communities, turning potential into triumph. Simultaneously, we are committed to empowering investors, turning them into winners by offering them unique opportunities in the crypto lottery space. Our platform serves as the bridge between visionary projects and discerning investors, fostering growth, excitement, and success in the dynamic world of cryptocurrency.
           </p>
        </p>
      </div>

      <div className="vision">
        <h2 className={styles.title}>Vision Statement : </h2>
        <p className={styles.text}>
         <span className={styles.italic}> Lucky1's vision is to reveal the full potential of crypto projects and investors by transforming aspirations into achievements. </span> 
         
         <p>
         <br/>
          Our Vision is a future where the transformative power of cryptocurrency is fully unleashed. We aim to be the catalyst that reveals the untapped potential of both crypto projects and investors. Our vision is to create a world where founders see their innovative ideas flourish into successful ventures, and investors discover new horizons of opportunity and growth. By bridging the gap between groundbreaking projects and forward-thinking investors, we seek to drive a new era of prosperity and progress in the crypto landscape, turning aspirations into tangible achievements for everyone involved.
          </p>
        </p>
      </div>

      <div className={styles.founders}>
  <h2 className={styles.title}>Our Founders</h2>

  <div className={styles.person}>
    <a href="https://www.linkedin.com/in/emmanuel-theman/"><img src={TheMan} alt="Emmanuel Tunda"/></a>
    <p className={styles.text}>
      Emmanuel Tunda, Co-Founder and CEO: Emmanuel brings over seven years of experience in the finance industry, 
      with a focus on insurance management and investments in both the stock market and cryptocurrency.
    </p>
  </div>

  <div className={styles.person}>
    <a href="https://www.linkedin.com/in/ganza-manegabe"><img src={Darious} alt="Ganza Managegabe"/></a>
    <p className={styles.text}>
      Ganza Managegabe, Co-Founder and COO: With a rich background in operational management and strategic planning, 
      Ganza's expertise lies in steering companies towards efficiency and growth. 
      His experience in the tech and finance sectors has been instrumental in shaping the operational backbone of Lucky1.
    </p>
  </div>

  <div className={styles.person}>
    <a href="https://www.linkedin.com/in/brice-aminou"><img src={Bruce} alt="Brice Aminou"/></a>
    <p className={styles.text}>
      Brice Aminou, Co-Founder and CTO: Brice is a technology visionary with extensive experience in blockchain and crypto technologies.
      His innovative approach to tech solutions has been pivotal in developing Lucky1's robust and secure platform.
    </p>
  </div>
</div>
      <p className={styles.text}>
          Together, our founders combine their expertise in finance, operations, and technology to lead Lucky1 towards a future where everyone has the opportunity to succeed in the dynamic world of cryptocurrency.
        </p>
      </div>
      </div>
    </div>
  );
};

export default About;

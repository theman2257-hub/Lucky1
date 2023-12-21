import React from 'react';
import styles from "./style.module.css";
const UserGuide = () => {
  return (
    <div class={styles.userGuidContainer}>
    <div class="container">
        <div class={styles.textContainer}>
            <h2 class={styles.title}>USER GUIDES</h2>
            <div class={styles.createLottery}>
              
                <p class={styles.text}>
                <h4 className={styles.title}>How to Create a Lottery :</h4>
                    Creating a lottery on Lucky1 involves a multi-step process designed to be user-friendly and efficient:
                </p>

                <div class={styles.text}>
                    <ol>
                        <li>
                            <span class={styles.subTitle}>Connect Your Wallet :</span> Start by connecting your wallet. Click the 'Connect Wallet' button on the top right of the screen to establish a secure connection.
                        </li>
                        <li>
                            <span class={styles.subTitle}>Choose Your Blockchain Network :</span> Select the appropriate blockchain network. This choice is critical, as you'll need the lottery fee token on this network to complete transactions. The network selection is made via the 'Network' button, also located at the top right.
                        </li>
                        <li>
                            <span class={styles.subTitle}>Navigate to the Create Lottery Page :</span> Design your unique lottery on this page. Add all necessary specifications and descriptions that highlight the purpose of your lottery and encourage users to participate and promote it.
                        </li>
                       </ol>
                            In the "Create Lottery" section of Lucky1, the following fields and specifications are provided:
                            
                            <ul type="1">
                                <br/>
                                <li><span class={styles.subTitle}>Lottery Name :</span> Choose a distinctive and memorable name for your lottery.</li>
                                <li><span class={styles.subTitle}>Fee Token :</span> This is the token in which all transactions, including the purchase of lottery tickets, affiliate fees, creator fees, and platform fees, will be conducted. Users who don't possess this token must first convert their existing tokens into the required one.</li>
                                <li><span class={styles.subTitle}>Lottery End Date : </span> Set the end date and time for your lottery. It begins counting down as soon as the lottery creation transaction is completed. The lottery may end earlier if all tickets are sold. If the end date arrives and not all tickets are sold, 
                                the prize will be the sum of the sold tickets, regardless of the maximum ticket number or target prize.</li>
                                <li><span class={styles.subTitle}>Prize Distribution : </span>
                                Define the number of winners and the prize structure in percentages (e.g., 1 Winner = 100%, 2 Winners = 50% each). If the number of tickets sold is less than the number of winners, the prize defaults to a single winner at 100%.
                                </li>
                                <li><span class={styles.subTitle}> Charity Fee : </span> Specify a percentage of the lottery's revenue to donate to a charity. This amount is deducted from the total prize and sent to the charity's address after the lottery ends.
                                </li>
                                <li>
                                <span class={styles.subTitle}> Charity Address : </span>
                                Enter the wallet address of the charity or cause you wish to support with a portion of your lottery's proceeds.
                                </li>
                                <li>
                                <span class={styles.subTitle}> Affiliate Fee :  </span>
                                Set a commission for individuals who refer others to your lottery. This commission also applies to the prize if the winner bought their ticket via an affiliate link.
                                </li>
                                <li>
                                <span class={styles.subTitle}> Entrance Fee :   </span>
                                Set the cost of one lottery ticket in your chosen fee token (e.g., 10 tokens per ticket).
                                </li>
                                <li>
                                <span class={styles.subTitle}> Creator Fee :   </span> Determine the percentage fee you'll receive as the lottery creator.
                                </li>
                                <li>
                                <span class={styles.subTitle}>  Number of Tickets :   </span>
                                Decide the total number of tickets available for sale in your lottery.
                                </li>
                                <li>
                                <span class={styles.subTitle}> Max Ticket per Wallet :   </span>
                                Specify the maximum number of tickets that a single wallet can purchase, to ensure fair participation.

                                </li>

                            </ul>
                        
                   
                </div>
            
            </div>
            <div class={styles.text}>
            <h2 className={styles.title}> How to buy a Lottery ticket</h2>
            <p >
              
                After connecting your wallet, click on the "View Lottery" button to access a list of available lotteries. </p>
                <ul>
                    <br/>
                    <p>On the lottery page, you'll find : </p>
                    <li>
                        <span class={styles.subTitle}> Max.Prize & Token Fee Symbol :   </span>
                        Shows the highest possible prize amount, which may vary based on the number of winners, affiliate fee, creator fee, and platform fee.
                     </li>
                     <li>
                        <span class={styles.subTitle}> Tickets Remaining (X/Y Ticket Left) :    </span>
                        Displays how many tickets are left out of the total available.
                     </li>
                     <li>
                        <span class={styles.subTitle}> View Creator Button :    </span>
                        Indicates the percentage of lottery revenue going to the lottery creator.
                     </li>
                     <li>
                        <span class={styles.subTitle}> Affiliate Fee :   </span>
                         Shows the fee paid for transactions made through affiliate links.
                     </li>
                     <li>
                        <span class={styles.subTitle}> Live/Ended Status :    </span>
                        Displays whether the lottery is currently active or has concluded.
                     </li>
                     <li>
                        <span class={styles.subTitle}> Charity/Free Badges :    </span>
                        Lotteries for a cause will have a charity badge, and those offering free tickets will display a free badge.
                     </li>
                     <li>
                        <span class={styles.subTitle}> Countdown : </span>
                        A timer counting down to the lottery's end.
                    </li>
                    <li>
                        <span class={styles.subTitle}> My Purchased Tickets (x/Y)   :  </span>
                        Shows the number of tickets you've purchased and the maximum allowed per wallet.

                    </li>
                    <li>
                        <span class={styles.subTitle}> Max Winners :  </span>
                        Max Winners: Indicates the number of potential winners.
                    </li>
                    <li>
                        <span class={styles.subTitle}> Distribution :  </span>
                        Details the prize structure in percentages, such as "Winner 1: 50%, Winner 2: 30%, Winner 3: 20%."
                    </li>
                    <li>
                        <span class={styles.subTitle}> Price per Ticket/Symbol and Chain :   </span>
                        Shows the cost of a single ticket, the token fee's symbol, and the blockchain network hosting the lottery.
                    </li>
                    <li>
                        <span class={styles.subTitle}> Buy Ticket/Buy Max Buttons :   </span>
                        Enables purchasing a set number of tickets, with the "Buy Max" option allowing for the maximum ticket purchase per wallet for that particular lottery.  </li>

                </ul>
             
            </div>
        </div>
    </div>
</div>

  );
};

export default UserGuide;

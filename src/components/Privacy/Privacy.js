import React from 'react'
import styles from "./style.module.css";
const Privacy = () => {
  return (
    <div className={styles.privacyContainer}>
        <div className='container'>
            <div className={styles.textContainer} >
                
        <p className={styles.text}>
        <div className={styles.privacyText}>
            Lucky1 Privacy Policy
        </div>

Last modified: 2023-07-22 <br/>

This Privacy Policy (the "Policy") explains how Lucky1 ("we," "us," "our") collects, uses, and shares data in connection with the decentralized lottery platform known as Lucky1 (the "Services"). By using the Services, you agree to the terms of this Policy.

Data Collection

At Lucky1, we prioritize user privacy and ensure that only essential data is collected for the smooth functioning of our platform. We do not maintain user accounts, and we do not collect or store personal data, such as first names, last names, street addresses, dates of birth, email addresses, or IP addresses.

We only collect the following data:
</p>
<p className={styles.text}>
Publicly-available blockchain data: When you connect your non-custodial blockchain wallet to the Services, we collect and log your publicly-available blockchain address. This information is used to understand your use of the Services and to screen your wallet for any prior illicit activity. Please note that blockchain addresses are publicly-available data and are not created or assigned by us or any central party, and they do not personally identify you.

Limited off-chain data: We collect limited off-chain data, such as device type, browser version, etc., to help improve our product vision. This data is not used to track individual users.

Information you specifically provide us: If you voluntarily sign up to receive emails from us, we will store your email address to send you those emails. However, we will not attempt to link your email address to your wallet address, IP address, or any other personal data.
</p>
<p className={styles.text}>
How We Use Data

The data we collect is used in accordance with your instructions and to comply with applicable laws and regulations. We use the data for the following purposes:

Providing and improving the Services: We use the collected data to provide, maintain, customize, and enhance the features of our platform.

Customer support: Data is used to provide customer support and respond to inquiries about the Services.
</p>

<p className={styles.text}>

Safety and security: We may use data to protect against fraudulent, unauthorized, or illegal activity, address security risks, enforce our agreements, and protect our users and Lucky1.

Legal compliance: We may use the data as required by regulators, government entities, and law enforcement to comply with applicable laws and regulations.

Aggregated data: We may compile aggregated data to gain insights into how users interact with the Services and to improve user experiences.
</p>
<p className={styles.text}>
<span  className={styles.italic}>How We Share Data</span> <br/>

We are committed to safeguarding your data and share it only in specific situations:

Service providers: We may share information with our service providers to assist us in providing, delivering, and enhancing the Services. For example, we may share your wallet address with technical infrastructure service providers, blockchain analytics providers to detect illicit activities, and analytics providers to understand user interactions.

Legal obligations: We may share data in response to litigation, regulatory proceedings, compliance measures, or when compelled by legal procedures, court orders, or subpoenas. We may also share data to prevent harm to users, Lucky1, or others, and to enforce our agreements and policies.

Safety and security: Data may be shared to protect against fraudulent, unauthorized, or illegal activity, address security risks, and enforce our agreements.

Business changes: In the event of a merger, acquisition, bankruptcy, dissolution, or other business transaction, data may be transferred or shared with another entity.

With your consent: We may share your information with third parties when you provide us with your explicit consent to do so.
</p>
<p className={styles.text}>
Third-Party Cookies

We may use third-party services that utilize tracking technologies like cookies, deviceID, and localStorage to understand your use of the Services and interactions with Lucky1. You can opt out of having your online activity and device data collected by these third-party services using various privacy settings in your browser or device.

<span  className={styles.italic}> Security </span> <br/>

We implement reasonable administrative, physical, and technical security measures to protect data from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, please note that transmitting information over the internet is not entirely secure, and we cannot guarantee the security of your data. You are responsible for the security of your blockchain network addresses, cryptocurrency wallets, and cryptographic keys.

Age Requirements

The Services are intended for a general audience and not directed at children. We do not knowingly collect personal information from children under the age of 18. If you believe we have received such information, please contact us at info@lucky1.io.

Changes to this Policy

If there are any material changes to this Policy, we will notify you through the Services. Your continued use of the Services indicates your acceptance of any changes to the Policy.
</p>
<p className={styles.text}>
<span  className={styles.italic}>Contact Us </span> <br/>

If you have any questions or concerns about this Policy or how we handle your information, please contact us at <span  className={styles.italic}> <a className={styles.privacyLink} href="mailto:info@lucky1.io.">info@lucky1.io.</a>  </span>

</p>
</div>
</div>
    </div>
  )
}

export default Privacy
import React, { useState } from "react";
import { facebook, slack, youtube, zoom, whatsapp } from "../../images/images";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import styles from "./styles.module.css";
import FooterBottom from "./FooterBottom/FooterBottom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState("USD");
  const currencies = ["USD", "EUR", "CAD"].filter(
    (el) => el.toLowerCase() !== currentCurrency.toLocaleLowerCase()
  );

  const socialMedias = [
    { icon: facebook, to: "#" },
    { icon: slack, to: "#" },
    { icon: youtube, to: "#" },
    { icon: zoom, to: "#" },
    { icon: whatsapp, to: "#" },
  ];
  const marketPlace = [
    { name: "Explore", to: "#" },
    { name: "Help Center", to: "#" },
    { name: "Become a Partner", to: "#" },
    { name: "Platform Status", to: "#" },
  ];
  const submitHandle = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className={styles.footerContainer}>
        
      </section>
      <FooterBottom />
    </>
  );
};

export default Footer;

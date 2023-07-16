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
        <div className="container">
          <div className={styles.footer}>
            <form className="">
              <h5 className={styles.heading}>Subscribe to updates</h5>
              <div className={styles.inputContainer}>
                <input
                  type="email"
                  placeholder="Enter your e-mail"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
                <button
                  type="submit"
                  onSubmit={submitHandle}
                  className={styles.button}
                >
                  Register
                </button>
              </div>
              <div className={styles.socialContainer}>
                <h5 className={styles.heading}>Follow us</h5>
                <div className={styles.socials}>
                  {socialMedias.map((el, i) => (
                    <a
                      href={el.to}
                      key={i}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.social}
                    >
                      <img src={el.icon} alt="" className={el.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </form>
            <div className={styles.marketPlaceAndRegion}>
              <div className={styles.marketPlace}>
                <h5 className={styles.heading}>Marketplace</h5>
                {marketPlace.map((el, i) => (
                  <a
                    href={el.to}
                    key={i}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.text}
                  >
                    {el.name}
                  </a>
                ))}
              </div>
              <div className={styles.marketPlace}>
                <h5 className={styles.heading}>Marketplace</h5>
                {marketPlace.map((el, i) => (
                  <a
                    href={el.to}
                    key={i}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.text}
                  >
                    {el.name}
                  </a>
                ))}
              </div>

              <div className={styles.regionContainer}>
                <h5 className={styles.heading}></h5>
                <p className={styles.text}>
                  Join our community today and stay up-to-date with the latest
                  news and updates on our cutting-edge lottery crypto platform.
                  Follow us on social media and subscribe to our newsletter to
                  never miss a chance to win big!
                </p>
                <div className={styles.dropdown}>
                  <p className={styles.dropDownItem}>
                    Currency - {currentCurrency}
                  </p>
                  {dropDown ? (
                    <BiChevronUp
                      className={styles.arrow}
                      onClick={() => setDropDown((prev) => !prev)}
                    />
                  ) : (
                    <BiChevronDown
                      className={styles.arrow}
                      onClick={() => setDropDown((prev) => !prev)}
                    />
                  )}
                  {dropDown && (
                    <div className={styles.dropDownItems}>
                      {currencies.map((el, i) => (
                        <p
                          key={i}
                          className={styles.dropDownItem}
                          onClick={() => {
                            setCurrentCurrency(el);
                            setDropDown((prev) => !prev);
                          }}
                        >
                          Currency - {el}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterBottom />
    </>
  );
};

export default Footer;

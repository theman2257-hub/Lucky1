import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";
import { NavLink, Link } from "react-router-dom";
import { logo } from "../../images/images";
import Logo from "../../images/logo.png";
import styles from "./styles.module.css";
import { useChain } from "../../wallet/WalletContext";
import { solana_chain_names, evm_chain_names } from "../../constants/chainInfo";
import {
  WalletMultiButton,
  BaseWalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import WagmiButton from "../WagmiButton";
import ConnectWalletButton from "./ConnectWalletButton";

const Navbar = ({ openSelectNetwork }) => {
  const { foo, chainId } = useChain();
  const [sidebar, setSidebar] = useState(false);
  const navItems = [
    { navItem: "Create Lottery", to: "/createLottery" },

    { navItem: "About Us", to: "/about" },
    { navItem: "How it Works", to: "/HowitWorks" },
    { navItem: "Contact us", to: "/contact" },

    {
      navItem: `${foo ? `Profile` : ""}`,
      to: `${foo ? `/profile/${foo}` : ""}`,
    },
  ];

  const LABELS = {
    "change-wallet": "Change wallet",
    connecting: "Connecting ...",
    "copy-address": "Copy address",
    copied: "Copied",
    disconnect: "Disconnect",
    "has-wallet": "Connect",
    "no-wallet": "Select Wallet",
  };
  return (
    <section className={styles.navbar}>
      <div className="container">
        <div className={styles.navs}>
          <Link to="/">
            <img src={logo} width="50" alt="#" className={styles.logo} />
          </Link>
          <div className={`${styles.navItems} ${sidebar && styles.sidebar}`}>
            {navItems.map((el, i) => (
              <NavLink
                to={el.to}
                key={i}
                onClick={() => setSidebar(false)}
                className={({ isActive }) =>
                  isActive ? styles.navItemActive : styles.navItem
                }
              >
                {el.navItem}
              </NavLink>
            ))}
            {sidebar && (
              <MdOutlineClose
                className={styles.close}
                onClick={() => setSidebar((prev) => !prev)}
              />
            )}
          </div>
          <ConnectWalletButton />
          <div className={styles.buttonContainer}>
            <button
              onClick={() => {
                openSelectNetwork();
              }}
              className={styles.button}
            >
              {!chainId && (
                <span className={styles.buttonText}>Select Network</span>
              )}
              {chainId && (
                <span className={styles.buttonText}>
                  {solana_chain_names[chainId] || evm_chain_names[chainId]}
                </span>
              )}
            </button>

            <RxHamburgerMenu
              className={styles.hamburger}
              onClick={() => setSidebar((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;

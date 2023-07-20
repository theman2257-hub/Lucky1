import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";
import { NavLink,Link } from "react-router-dom";
import { logo } from "../../images/images";
import Logo  from "../../images/logo.png"
import styles from "./styles.module.css";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";

const Navbar = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const [sidebar, setSidebar] = useState(false);
  const navItems = [

    { navItem: "Create Lottery", to: "/createLottery" },
    { navItem: "Contact us", to: "/" },
    { navItem: `${address ? `Profile` : ""}`, to: `${address ? `/profile/${address}` : ""}` },
  ];
  return (
    <section className={styles.navbar}>
      <div className="container">
        <div className={styles.navs}>
        <Link to = "/"><img src={logo} width="50" alt="#" className={styles.logo} /></Link>
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
          <div className={styles.buttonContainer}>
            <button onClick={open} className={styles.button}>
              {!address && (
                <span className={styles.buttonText}>Connect Wallet</span>
              )}
              {address && (
                <span className={styles.buttonText}>
                  {address.slice(0, 6)}...{address.slice(-4)}
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

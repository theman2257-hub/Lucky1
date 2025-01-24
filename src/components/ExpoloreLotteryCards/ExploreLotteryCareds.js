import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { erc20ABI, useAccount } from "wagmi";
import {
  BiSearch,
  BiChevronUpCircle,
  BiChevronDownCircle,
} from "react-icons/bi";
import {
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8,
} from "../../images/images";
import Cards from "./Cards/Cards";
import styles from "./styles.module.css";
import { getEvmClient, getSolanaConnection } from "../Utils/graphClient";
import { fetchLotteriesSolana } from "../Utils/solanaActions";
import { useChain } from "../../wallet/WalletContext";
import LotteryDetails from "../Utils/lotteryActions";

const ExploreLotteryCareds = () => {
  const [data, setLotterydata] = useState([]);
  const [chain, setChain] = useState();

  const { chainId } = useChain();

  const fetchLottery = async () => {
    const lotteryInstance = new LotteryDetails({ chainId });

    const lotteryData = await lotteryInstance.getLotteries();
    setLotterydata(lotteryData);
  };

  React.useEffect(() => {
    console.log(chainId);
    if (!chainId) return;
    if (chainId !== chain) {
      console.log(`changing ${chain} to - `, chainId);
      setLotterydata([]);
      setChain(chainId);
      fetchLottery();
    }
  }, [chainId]);
  const [searchValue, setSearchValue] = useState("");
  const [filterBy, setFilterBy] = useState("Newest");
  const allFilterByItems = ["Oldest", "Newest"].filter(
    (el) => el.toLocaleLowerCase() !== filterBy.toLocaleLowerCase()
  );
  const [dropDown, setDropDown] = useState(false);

  // categoryWiseFilter
  const [category, setCategory] = useState("all");
  const allCategory = ["all", "Free", "Charity"];

  const filterData = data
    ?.filter((el) => {
      if (category === "all") {
        return true;
      } else if (category.toLocaleLowerCase() === "charity") {
        return el.charityFee > 0;
      } else if (category.toLocaleLowerCase() === "free") {
        return el.ticketPrice == 0;
      }
      return true;
    })
    .filter((el) => el.name.toLowerCase().includes(searchValue.toLowerCase()))
    .sort((a, b) => {
      const timeA = parseInt(a.startTime);
      const timeB = parseInt(b.startTime);

      if (filterBy === "Newest") {
        return timeB - timeA;
      } else if (filterBy === "Oldest") {
        return timeA - timeB;
      }

      return 0;
    });

  return (
    <section className={styles.exploreLotteryContainer}>
      <div className="container">
        <div className={styles.exploreLottery}>
          <div className={styles.headingContainer}>
            <h2 className={styles.title}>Explore Existing lotteries</h2>
            <p className={styles.text}>
              In the section, you can quickly filter and select lotteries based
              on the their details
            </p>
          </div>
          {/* filtering bar */}
          <div className={styles.topBar}>
            <div className={styles.allCategory}>
              {allCategory.map((el, i) => (
                <button
                  className={`${styles.category} ${
                    category.toLocaleLowerCase() ===
                      allCategory[i].toLocaleLowerCase() &&
                    styles.activeCategory
                  }`}
                  key={i}
                  onClick={() => setCategory(el)}
                >
                  {el}
                </button>
              ))}
            </div>
            <div className={styles.searchAndFilter}>
              <div className={styles.inputContainer}>
                <BiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  className={styles.input}
                  name="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search here"
                />
              </div>
              <div className={styles.filter}>
                <div className={styles.dropdown}>
                  <p className={styles.dropDownItem}>
                    {" "}
                    <span className={styles.order}>Order : </span> {filterBy}
                  </p>
                  {dropDown ? (
                    <BiChevronUpCircle
                      className={styles.arrow}
                      onClick={() => setDropDown((prev) => !prev)}
                    />
                  ) : (
                    <BiChevronDownCircle
                      className={styles.arrow}
                      onClick={() => setDropDown((prev) => !prev)}
                    />
                  )}
                  {dropDown && (
                    <div className={styles.dropDownItems}>
                      {allFilterByItems.map((el, i) => (
                        <p
                          key={i}
                          className={styles.dropDownItem}
                          onClick={() => {
                            setDropDown(false);
                            setFilterBy(el);
                          }}
                        >
                          {el}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* all items */}
        <div className={styles.cardsWrapper}>
          {filterData?.map((el, i) => (
            <Cards {...el} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreLotteryCareds;

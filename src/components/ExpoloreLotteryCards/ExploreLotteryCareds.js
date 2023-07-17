import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { erc20ABI } from "wagmi";
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
const ExploreLotteryCareds = () => {
  const [data, setLotterydata] = useState([])
  let abierc = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "issuer", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "value", "type": "bool" }], "name": "IssuerRights", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "TransferOwnership", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_spender", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "burn", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "burnFrom", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isIssuer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_issuer", "type": "address" }, { "internalType": "bool", "name": "_value", "type": "bool" }], "name": "setIssuerRights", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

  console.log(typeof data)

  //import lottery from api

  const fetchLottery = async () => {

    let query = `
    {
      lotteries {
        id
        creator
        lotteryAddress
        name
        symbol
        ticketPrice
        maxTickets
        maxWinners
        endDate
        charity
        feeToken
        creatorFee
        charityFee
        startTime
        tokenSymbol
      }
    }`
    let url = "https://api.thegraph.com/subgraphs/name/civa/lottery_lucky1";
    const { data } = await axios.post(url, { query });
    console.log(data.data.lotteries);
    let rpc = "https://rpc.solidhash.io/public/bsc";
    let provider = new ethers.providers.JsonRpcProvider(rpc);

    const getSymbol = async (address) => {
      console.log(address)
      let provider = new ethers.providers.JsonRpcProvider(rpc);
      let contract = new ethers.Contract(address, abierc, provider);
      let symbol = await contract.symbol();
      console.log(symbol)
      if (!symbol) {
        return "NULL";
      }
      return symbol;
    }
    let lotteryData = data.data.lotteries.map((el, index) => {
      return {
        id: el.id,
        creator: el.creator,
        lotteryAddress: el.lotteryAddress,
        name: el.name,
        symbol: el.symbol,
        ticketPrice: el.ticketPrice,
        maxTickets: el.maxTickets,
        maxWinners: el.maxWinners,
        endDate: el.endDate,
        charity: el.charity,
        feeToken: el.feeToken,
        creatorFee: el.creatorFee,
        charityFee: el.charityFee,
        startTime: el.startTime,
        tokenSymbol: el.tokenSymbol
      };
    })

    setLotterydata(lotteryData)
  };

  React.useEffect(() => {
    fetchLottery();
  }, []);
  const [searchValue, setSearchValue] = useState("");
  const [filterBy, setFilterBy] = useState("Newest");
  const allFilterByItems = ["Oldest", "Newest"].filter(
    (el) => el.toLocaleLowerCase() !== filterBy.toLocaleLowerCase()
  );
  const [dropDown, setDropDown] = useState(false);

  // categoryWiseFilter
  const [category, setCategory] = useState("all");
  const allCategory = ["all", "Free", "Charity"];
  // let filterData =
  //   category.toLocaleLowerCase() === "all"
  //     ? data.filter((el, _) =>
  //       el.name.toLowerCase().includes(searchValue.toLowerCase())
  //     ) : category.toLocaleLowerCase() === "free" ? data
  //       .filter(
  //         (el, _) =>
  //           el.ticketPrice == 0
  //       ) : data.filter((el, _) =>
  //         el.charityFee != 0
  //       )
















  //         .sort((a, b) => {
  //           if (filterBy == "Newest") {
  //             return b.block - a.block;
  //           } else if (filterBy == "Oldest") {
  //             return a.block - b.block;
  //           }
  //           //  else if (filterBy === "Best") {
  //           //   return b.rating - a.rating;
  //           // }
  //         });

  return (
    <section className={styles.exploreLotteryContainer}>
      <div className="container">
        <div className={styles.exploreLottery}>
          <div className={styles.headingContainer}>
            <h2 className={styles.title}>Explore lottery cards</h2>
            <p className={styles.text}>
              In the section, you can quickly filter and select lotteries based
              on the details of your needs
            </p>
          </div>
          {/* filtering bar */}
          <div className={styles.topBar}>
            <div className={styles.allCategory}>
              {allCategory.map((el, i) => (
                <button
                  className={`${styles.category} ${category.toLocaleLowerCase() ===
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
          {data?.map((el, i) => (
            <Cards {...el} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreLotteryCareds;
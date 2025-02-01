import React, { useMemo, useState } from "react";
import Input from "../../components/CreateLottery/Input/Input";
import { textIcon, dollar, usdt, calender, winner } from "../../images/images";
import styles from "./styles.module.css";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import SetPrizeAmountModal from "../../components/CreateLottery/SetPrizeAmountModal/SetPrizeAmountModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { create_mint, create_token_account, findMasterEditionPda, getCreateMintInstructions, getCreateTokenAccountInstructions, initProgram, isValidPublicKey } from "../../lib/sol-program";
import { useRecoilValue } from "recoil";
import { GlobalStateState } from "../../state/solana";
import InitSolanaProgram from "../../components/InitSolanaProgram";
import { Keypair, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { BN } from "@coral-xyz/anchor";
import { useChain } from "../../wallet/WalletContext";
import { getMint } from "@solana/spl-token";

const CreateLottery = () => {
  const globalState = useRecoilValue(GlobalStateState);
  const [showLoader, setShowLoader] = useState(false);
  const [showPrizeAmountModal, setShowPrizeAmountModal] = useState(false);
  const [prizeAmount, setPrizeAmount] = useState("");
  const { wallet, connected, connecting, publicKey, signTransaction } = useWallet();
  const depositPrizeAmount = async () => {
  };
  const navigate = useNavigate();
  const { chainId } = useChain();


  const [disable, setDisable] = React.useState(true);
  const [values, setValues] = useState({
    lotteryName: "Lucky1 Lottery",
    lottrySymbol: "LUCKY",
    entranceFee: "30",

    lottryEndDate: "",

    charityAddress: "0x62cEFa2920Aa80D67e38C00A84723b3Fc9fA866B",
    FeeToken: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
    CreatorFee: "15",
    charityFee: "0",
    numberofTickets: "100",
    maxTicketPerWallet: "1", // Preset to 1
    prizeDistribution: ["50", "50"],
    affiliateFee: "0",
    affiliateAddress: "0x0000000000000000000000000000000000000000",
    chain: 42161,
  });

  const onChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "chain") {
      value = parseInt(value);
    }
    setValues({ ...values, [e.target.name]: value });
  };

  const inputs = [
    {
      icon: textIcon,
      label: "Lottery name",
      type: "text",
      name: "lotteryName",
      placeholder: "Enter name",
      onChange: onChange,
    },
    {
      icon: dollar,
      label: "Entrance Fee",
      labelExplainer: "Price of 1 ticket, in your Fee Token, e.g = 10",
      type: "text",
      min: 1,
      name: "entranceFee",
      placeholder: "Enter entrance fee",
      onChange: onChange,
    },

    {
      icon: dollar,
      label: "Lottery Symbol",
      type: "text",
      name: "lottrySymbol",
      placeholder: "Enter symbol",
    },
    {
      icon: usdt,
      label: "Fee Token",
      type: "text",
      labelExplainer:
        "Your lottery tickets will only be purchased in this token",
      name: "FeeToken",
      placeholder: "Enter token to pay fee",
      onChange: onChange,
    },
    // {
    //   icon: usdt,
    //   label: "Creator Fee",
    //   labelExplainer:
    //     "Lottery creator’s fee to be rewarded for creating this lottery",
    //   type: "text",
    //   name: "CreatorFee",
    //   placeholder: "Enter creator fee",
    //   onChange: onChange,
    // },
    {
      icon: calender,
      label: "lottery end date",
      type: "datetime-local",
      name: "lottryEndDate",

      placeholder: "Enter date",
      onChange: onChange,
      required: true
    },

    {
      icon: winner,
      label: "Number of tickets",
      labelExplainer: "Total number of tickets to be sold for this lottery",
      type: "number",
      min: 1,
      name: "numberofTickets",
      placeholder: "Enter number of Tickets",
      onChange: onChange,
    },
    // {
    //   icon: winner,
    //   label: "Lottery Password",
    //   type: "password",
    //   min: 1,
    //   name: "password",
    //   placeholder: "Enter password",
    //   switchs: true,
    //   disable: disable,
    //   setDisable: setDisable,
    // },
    // Prize Distribution
    {
      icon: dollar,
      label: "Prize Distribution",
      labelExplainer: "In % e.g : 1 Winner=100, 2winner= 50,50",
      type: "text", // Use "text" type to allow comma-separated input
      name: "prizeDistribution",
      placeholder: "Enter prize distribution (comma-separated percentages)",
      onChange: (e) => {
        const inputValues = e.target.value;
        const parsedDistribution = inputValues
          .split(",")
          .map((value) => value.trim());

        setValues({
          ...values,
          prizeDistribution: parsedDistribution,
          // @ts-ignore
          formattedPrizeDistribution: `[${parsedDistribution.join(",")}]`,
        });
      },
    },
    // Max Ticket Per Wallet
    {
      icon: winner,
      label: "Max Ticket Per Wallet",
      labelExplainer:
        "Maximum number of ticket a wallet can purchase for this lottery",
      type: "number",
      min: 1,
      name: "maxTicketPerWallet",
      placeholder: "Enter max ticket per wallet",
      preset: "1",
      switchs: true,
      disable: disable,
      setDisable: setDisable,
      onChange: (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      },
    },
    // {
    //   icon: dollar,
    //   label: "Charity Fee",
    //   labelExplainer:
    //     "The % of the lottery revenue that you want to share with a charity",
    //   type: "text",
    //   min: 1,
    //   name: "charityFee",
    //   placeholder: "Enter charity fee",
    //   switchs: true,
    //   disable: disable,
    //   setDisable: setDisable,
    //   onChange: onChange,
    // },
    // {
    //   icon: winner,
    //   label: "Charity Address",
    //   type: "text",
    //   name: "charityAddress",
    //   placeholder: "Enter address",
    //   switchs: true,
    //   disable: disable,
    //   setDisable: setDisable,
    //   onChange: onChange,
    // },
    // {
    //   icon: dollar,
    //   label: "Affiliate Fee",
    //   labelExplainer:
    //     "Reward commission for those referring your project to others",
    //   type: "text",
    //   min: 1,
    //   name: "affiliateFee",
    //   placeholder: "Enter affiliate fee",
    //   switchs: true,
    //   disable: disable,
    //   setDisable: setDisable,
    //   onChange: onChange,
    // },
    // {
    //   label: "Chain",
    //   labelExplainer: "Chain/Network you want to deploy on",
    //   type: "text",
    //   min: 1,
    //   name: "chain",
    //   disable: false,
    //   setDisable: setDisable,
    //   onChange: onChange,
    //   options: [
    //     { value: 56, label: "BSC", icon: bnb },
    //     { value: 97, label: "BSCT", icon: bnb },
    //     { value: 42161, label: "ARB", icon: arb },
    //   ],
    // },
  ];

  // Modified main handler with batched transactions
  async function handleCreateLottery(e) {
    e.preventDefault();

    try {
      if (!publicKey) return console.error("Wallet Not Connected");
      if (!isValidPublicKey(values.FeeToken)) {
        return console.error("Invalid Fee Token");
      }

      setShowLoader(true);

      const lotteryCurrencyMint = new PublicKey(values.FeeToken);
      const tokenAccountKeypair = Keypair.generate();
      const ticketMintKeypair = Keypair.generate();

      console.log(values);
      const program = initProgram(wallet);
      const provider = program.provider;

      const mintState = await getMint(provider.connection, lotteryCurrencyMint);
      // Existing parameter setup
      const priceAmount = parseInt(values.entranceFee);
      const ticketPrice = new BN(priceAmount * 10 ** mintState.decimals);
      const maxTickets = new BN(parseInt(values.numberofTickets));
      const maxTicketsPerUser = parseInt(values.maxTicketPerWallet);
      const prizeDistribution = Buffer.from(values.prizeDistribution.map((v) => parseInt(v)));
      const endTime = Math.floor(new Date(values.lottryEndDate).getTime() / 1000);


      // Get all PDAs and addresses
      const [lotteryCentralAuthority] = PublicKey.findProgramAddressSync(
        [Buffer.from("lottery-central-authority")],
        program.programId
      );

      const [lotteryAccount] = PublicKey.findProgramAddressSync(
        [Buffer.from("lottery-state"), ticketMintKeypair.publicKey.toBuffer()],
        program.programId
      );

      const [globalStateAddress] = PublicKey.findProgramAddressSync(
        [Buffer.from("global_state")],
        program.programId
      );

      const [ticketMintMetadata] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s").toBuffer(),
          ticketMintKeypair.publicKey.toBuffer(),
        ],
        new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")
      );

      const [lotteryCollectionMetadata] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s").toBuffer(),
          new PublicKey(globalState.lotteryCollectionMint).toBuffer(),
        ],
        new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")
      );

      const [masterEdition] = findMasterEditionPda(new PublicKey(globalState.lotteryCollectionMint));

      const createTokenAccountIxs = await getCreateTokenAccountInstructions(
        provider,
        lotteryCurrencyMint, // TODO:
        lotteryCentralAuthority,
        publicKey,
        tokenAccountKeypair
      );

      // Ticket mint instructions
      const ticketMintLamports = await getMinimumBalanceForRentExemptMint(provider.connection);
      const createTicketMintIx = SystemProgram.createAccount({
        fromPubkey: publicKey,
        newAccountPubkey: ticketMintKeypair.publicKey,
        space: MINT_SIZE,
        lamports: ticketMintLamports,
        programId: TOKEN_PROGRAM_ID,
      });

      const initTicketMintIx = createInitializeMint2Instruction(
        ticketMintKeypair.publicKey,
        0,
        lotteryCentralAuthority,
        lotteryCentralAuthority
      );

      // Lottery creation instruction
      const createLotteryIx = await program.methods
        .createLottery(
          values.lotteryName,
          values.lottrySymbol,
          "URI",
          ticketPrice,
          maxTickets,
          maxTicketsPerUser,
          new BN(endTime),
          prizeDistribution
        )
        .accounts({
          lotteryCreator: publicKey,
          globalState: globalStateAddress,
          mint: lotteryCurrencyMint,
          lotteryCentralAuthority: lotteryCentralAuthority,
          ticketMint: ticketMintKeypair.publicKey,
          lotteryCollectionMint: globalState.lotteryCollectionMint,
          lotteryCollectionMaster: masterEdition,
          lotteryCollectionMetadata: lotteryCollectionMetadata,
          ticketMintMetadata: ticketMintMetadata,
          lottery: lotteryAccount,
          lotteryTokenAccount: tokenAccountKeypair.publicKey,
          rent: SYSVAR_RENT_PUBKEY,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          tokenMetadataProgram: new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"),
        })
        .instruction();

      // Build and send single transaction
      const transaction = new Transaction().add(...createTokenAccountIxs).add(
        createTicketMintIx,
        initTicketMintIx,
        createLotteryIx
      );

      const recentBlockhash = (await provider.connection.getRecentBlockhash()).blockhash;
      transaction.feePayer = publicKey;
      transaction.recentBlockhash = recentBlockhash;

      const signedTx = await signTransaction(transaction);
      signedTx.partialSign(ticketMintKeypair, tokenAccountKeypair);

      const txid = await provider.connection.sendRawTransaction(signedTx.serialize());
      await provider.connection.confirmTransaction(txid);
      console.log("Transaction completed:", txid);

      console.log("Mint:", lotteryCurrencyMint.toBase58());
      console.log("Token Account:", tokenAccountKeypair.publicKey.toBase58());
      console.log("Ticket Mint:", ticketMintKeypair.publicKey.toBase58());

      // Verify lottery account creation
      const lotteryStateAcc = await provider.connection.getAccountInfo(lotteryAccount);
      console.log("Lottery account created:", !!lotteryStateAcc);

      alert(
        "*** Lottery Created Successfully ***Congratulations! Your lottery has been created.Please remember to add a description and image to enhance your lottery listing.Good luck!"
      );
    } catch (error) {
      console.log(error);
    }

    setShowLoader(false);
  }

  if (!globalState) {
    return (
      <InitSolanaProgram className={styles.createLotteryContainer} styles={styles} />
    )
  }

  return (
    <section className={styles.createLotteryContainer}>
      <div className="container">
        <div className={styles.headingContainer}>
          <h2 className={styles.title}>Create lottery</h2>
          <p className={styles.text}>
            In the section, you can quickly filter and select lotteries based on
            the details of your needs
          </p>
        </div>
        <div className={styles.wrapper}>
          <form onSubmit={handleCreateLottery} className={styles.details}>
            <div className={styles.inputWrapper}>
              {inputs.map((input, i) => (
                // @ts-ignore
                <Input {...input} key={i} value={values[input.name]} />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button
                type="submit"
                className={styles.button}
              >
                Create Lottery On Solana
              </button>
              {!connected && !connecting && (
                <p style={{ color: "red" }}>
                  Connect to Solana Wallet first
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
      {showPrizeAmountModal && (
        <SetPrizeAmountModal
          setModal={setShowPrizeAmountModal}
          prizeAmount={prizeAmount}
          setPrizeAmount={setPrizeAmount}
          depositPrizeAmount={depositPrizeAmount}
        />
      )}
      <Loader show={showLoader} />
    </section>
  );
};

export default CreateLottery;

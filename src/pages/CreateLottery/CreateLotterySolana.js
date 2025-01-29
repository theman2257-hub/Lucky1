import React, { useMemo, useState } from "react";
import Input from "../../components/CreateLottery/Input/Input";
import { textIcon, dollar, usdt, calender, winner } from "../../images/images";
import styles from "./styles.module.css";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import SetPrizeAmountModal from "../../components/CreateLottery/SetPrizeAmountModal/SetPrizeAmountModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { create_mint, create_token_account, findMasterEditionPda, initProgram } from "../../lib/sol-program";
import { useRecoilValue } from "recoil";
import { GlobalStateState } from "../../state/solana";
import InitSolanaProgram from "../../components/InitSolanaProgram";
import { Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, createAccount, createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { BN } from "@coral-xyz/anchor";

const CreateLottery = () => {
  const globalState = useRecoilValue(GlobalStateState);
  const [showLoader, setShowLoader] = useState(false);
  const [showPrizeAmountModal, setShowPrizeAmountModal] = useState(false);
  const [prizeAmount, setPrizeAmount] = useState("");
  const { wallet, connected, connecting, publicKey, signTransaction } = useWallet();
  const depositPrizeAmount = async () => {
  };


  const [disable, setDisable] = React.useState(true);
  const [values, setValues] = useState({
    lotteryName: "Lucky1 Lottery",
    lottrySymbol: "LUCKY",
    entranceFee: "30",

    lottryEndDate: "",

    charityAddress: "0x62cEFa2920Aa80D67e38C00A84723b3Fc9fA866B",
    FeeToken: "0x55d398326f99059fF775485246999027B3197955",
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

    // {
    //   icon: usdt,
    //   label: "Lottery Symbol",
    //   type: "text",
    //   name: "lottrySymbol",
    //   placeholder: "Enter symbol",
    // },
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
    {
      icon: usdt,
      label: "Creator Fee",
      labelExplainer:
        "Lottery creator’s fee to be rewarded for creating this lottery",
      type: "text",
      name: "CreatorFee",
      placeholder: "Enter creator fee",
      onChange: onChange,
    },
    {
      icon: calender,
      label: "lottery end date",
      type: "datetime-local",
      name: "lottryEndDate",

      placeholder: "Enter date",
      onChange: onChange,
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
    {
      icon: dollar,
      label: "Charity Fee",
      labelExplainer:
        "The % of the lottery revenue that you want to share with a charity",
      type: "text",
      min: 1,
      name: "charityFee",
      placeholder: "Enter charity fee",
      switchs: true,
      disable: disable,
      setDisable: setDisable,
      onChange: onChange,
    },
    {
      icon: winner,
      label: "Charity Address",
      type: "text",
      name: "charityAddress",
      placeholder: "Enter address",
      switchs: true,
      disable: disable,
      setDisable: setDisable,
      onChange: onChange,
    },
    {
      icon: dollar,
      label: "Affiliate Fee",
      labelExplainer:
        "Reward commission for those referring your project to others",
      type: "text",
      min: 1,
      name: "affiliateFee",
      placeholder: "Enter affiliate fee",
      switchs: true,
      disable: disable,
      setDisable: setDisable,
      onChange: onChange,
    },
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

  async function handleCreateLottery() {

    if (!publicKey) {
      return console.log("Wallet Not Connected")
    }

    const ticketPrice = new BN(10 * 10 ** 9);
    const maxTickets = new BN(100);
    const maxTicketsPerUser = 5;
    const maxWinners = 3;
    const prizeDistributionLength = 3;
    let prizeDistribution = Buffer.alloc(prizeDistributionLength);

    prizeDistribution[0] = 50;
    prizeDistribution[1] = 25;
    prizeDistribution[2] = 25;

    const program = initProgram(wallet);
    const provider = program.provider;
    const mint = await create_mint(provider, signTransaction, publicKey, publicKey);

    console.log("Here")

    // const lotteryTokenAccount = Keypair.generate();
    const ticket_mint = Keypair.generate();

    const [lotteryCentralAuthority, bump] = PublicKey.findProgramAddressSync(
      [Buffer.from("lottery-central-authority")],
      program.programId
    );

    const lotteryTokenAccount = await create_token_account(
      provider,
      signTransaction,
      // provider.wallet.payer,
      mint.publicKey,
      lotteryCentralAuthority,
      publicKey
    );

    // // Fund the initializer account to make it rent-exempt
    // await provider.connection.confirmTransaction(
    //   await provider.connection.requestAirdrop(
    //     initializer.publicKey,
    //     LAMPORTS_PER_SOL
    //   )
    // );

    // PublicKey.findProgramAddressSync(
    //   [
    //     user1.publicKey.toBuffer(),
    //     TOKEN_PROGRAM_ID.toBuffer(),
    //     ticket_collection_mint.toBuffer(),
    //   ],
    //   ASSOCIATED_TOKEN_PROGRAM_ID
    // )[0];
    // await getAssociatedTokenAddress(
    //   ticket_collection_mint,
    //   initializer.publicKey
    // );

    const [ticket_mint_metadata, _] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s").toBuffer(),
        ticket_mint.publicKey.toBuffer(),
      ],
      new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")
    );
    const mint_lamports = await getMinimumBalanceForRentExemptMint(
      provider.connection
    );

    const create_ticket_mint_ix = SystemProgram.createAccount({
      fromPubkey: publicKey,
      newAccountPubkey: ticket_mint.publicKey,
      space: MINT_SIZE,
      lamports: mint_lamports,
      programId: TOKEN_PROGRAM_ID,
    });

    const init_ticket_mint_ix = createInitializeMint2Instruction(
      ticket_mint.publicKey,
      0,
      lotteryCentralAuthority,
      lotteryCentralAuthority
    );

    const [masterEdition] = findMasterEditionPda(new PublicKey(globalState.lotteryCollectionMint));


    const endTime = Math.floor(
      new Date("January 31, 2025 03:24:00").getTime() / 1000
    );

    const lotteryAccount_A = PublicKey.findProgramAddressSync(
      [Buffer.from("lottery-state"), ticket_mint.publicKey.toBuffer()],
      program.programId
    )[0];

    const [lottery_collection_mint_metadata] =
      PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          new PublicKey(
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
          ).toBuffer(),
          (new PublicKey(globalState.lotteryCollectionMint)).toBuffer(),
        ],
        new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")
      );

    console.log("got to this pint")
    const globalStateAddress = PublicKey.findProgramAddressSync(
      [Buffer.from("global_state")],
      program.programId
    )[0];

    console.log(JSON.stringify({
      lotteryCreator: publicKey,
      globalState: globalStateAddress,
      mint: mint.publicKey,
      lotteryCentralAuthority: lotteryCentralAuthority,
      ticketMint: ticket_mint.publicKey,
      lotteryCollectionMint: globalState.lotteryCollectionMint,
      lotteryCollectionMaster: masterEdition,
      lotteryCollectionMetadata: lottery_collection_mint_metadata,
      ticketMintMetadata: ticket_mint_metadata,
      lottery: lotteryAccount_A,
      lotteryTokenAccount: lotteryTokenAccount.publicKey,
      rent: SYSVAR_RENT_PUBKEY,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      tokenMetadataProgram: new PublicKey(
        "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
      ),
    }, null, 2))

    // // Create the lottery
    const create_lottery_ix = await program.methods
      .createLottery(
        "NAME",
        "SYM",
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
        mint: mint.publicKey,
        lotteryCentralAuthority: lotteryCentralAuthority,
        ticketMint: ticket_mint.publicKey,
        lotteryCollectionMint: globalState.lotteryCollectionMint,
        lotteryCollectionMaster: masterEdition,
        lotteryCollectionMetadata: lottery_collection_mint_metadata,
        ticketMintMetadata: ticket_mint_metadata,
        lottery: lotteryAccount_A,
        lotteryTokenAccount: lotteryTokenAccount.publicKey,
        rent: SYSVAR_RENT_PUBKEY,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        tokenMetadataProgram: new PublicKey(
          "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        ),
      })
      .instruction();

    const transaction = new Transaction();

    transaction.feePayer = publicKey;
    transaction.recentBlockhash = (await provider.connection.getRecentBlockhash()).blockhash;

    transaction.add(
      create_ticket_mint_ix,
      init_ticket_mint_ix,
      create_lottery_ix
    );
    // const signers = [publicKey, ticket_mint];

    // await sendAndConfirmTransaction(
    //   provider.connection,
    //   create_lottery_transaction,
    //   signers
    // ).catch((e) => console.error(e));

    const signed = await signTransaction(transaction);
    signed.partialSign(ticket_mint)
    const txid = await provider.connection.sendRawTransaction(signed.serialize())
    await provider.connection.confirmTransaction(txid, 'confirmed');

    const lotteryStateAcc = await provider.connection.getAccountInfo(
      lotteryAccount_A
    );

    console.log(lotteryStateAcc)
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
          <form className={styles.details}>
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
                onClick={(e) => {
                  e.preventDefault();
                  handleCreateLottery()
                }}
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

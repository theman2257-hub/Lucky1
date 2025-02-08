import { useWallet } from "@solana/wallet-adapter-react";
import { findMasterEditionPda, getGlobalState, initProgram } from "../../lib/sol-program";
import { clusterApiUrl, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction } from "@solana/web3.js";
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    getMinimumBalanceForRentExemptMint,
    MINT_SIZE,
    createInitializeMint2Instruction,
    getAssociatedTokenAddress,
} from "@solana/spl-token";
import { useSetRecoilState } from "recoil";
import { GlobalStateState } from "../../state/solana";
import { useState } from 'react';



function InitSolanaProgram({ className, styles }) {
    const { wallet, signTransaction } = useWallet();
    const setGlobalState = useSetRecoilState(GlobalStateState)
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [uri, setUri] = useState("");

    async function handleInit(e) {

        try {
            e.preventDefault();

            const collectionMint = Keypair.generate()
            const initializer = wallet.adapter;
            const program = initProgram(wallet);

            const mintLamports = await getMinimumBalanceForRentExemptMint(
                program.provider.connection
            );
            const [globalState, globalStateBump] = PublicKey.findProgramAddressSync(
                [Buffer.from("global_state")],
                program.programId
            );
            const [lotteryCentralAuthority, bump] = PublicKey.findProgramAddressSync(
                [Buffer.from("lottery-central-authority")],
                program.programId
            );
            const [lotteryCollectionMetadataAddress, collectionBump] =
                PublicKey.findProgramAddressSync(
                    [
                        Buffer.from("metadata"),
                        new PublicKey(
                            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
                        ).toBuffer(),
                        collectionMint.publicKey.toBuffer(),
                    ],
                    new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")
                );
            const [masterEdition] = findMasterEditionPda(collectionMint.publicKey);
            const adminATA =
                await getAssociatedTokenAddress(
                    collectionMint.publicKey,
                    initializer.publicKey
                );
            const createLotteryMintIx = SystemProgram.createAccount({
                fromPubkey: initializer.publicKey,
                newAccountPubkey: collectionMint.publicKey,
                space: MINT_SIZE,
                lamports: mintLamports,
                programId: TOKEN_PROGRAM_ID,
            });

            const initLotteryMintIx = createInitializeMint2Instruction(
                collectionMint.publicKey,
                0,
                lotteryCentralAuthority,
                lotteryCentralAuthority
            );

            // Initialize the program
            const init_contract_ix = await program.methods
                .initialize(name, symbol, uri)
                .accounts({
                    globalState: globalState,
                    masterEditionAccount: masterEdition,
                    initializer: initializer.publicKey,
                    systemProgram: SystemProgram.programId,
                    lotteryCollectionMint: collectionMint.publicKey,
                    collectionMetadata: lotteryCollectionMetadataAddress,
                    initializerTokenAccount: adminATA,
                    lotteryCentralAuthority: lotteryCentralAuthority,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    tokenMetadataProgram: new PublicKey(
                        "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
                    ),
                    rent: SYSVAR_RENT_PUBKEY,
                    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                })
                .instruction();

            const init_transac = new Transaction();

            init_transac.add(
                createLotteryMintIx,
                initLotteryMintIx,
                init_contract_ix
            );

            init_transac.feePayer = initializer.publicKey;
            init_transac.recentBlockhash = (await program.provider.connection.getRecentBlockhash()).blockhash;

            const signedTx = await signTransaction(init_transac);
            signedTx.partialSign(collectionMint); // Add mint keypair signature
            console.log("hello wrold")

            const txid = await program.provider.connection.sendRawTransaction(
                signedTx.serialize()
            );

            console.log(`TxId: `, txid);
            setTimeout(async () => {
                setGlobalState(await getGlobalState())
            }, 1000);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={className} style={{ minHeight: "90vh", textAlign: 'center' }} >
            <h2 className={styles.title}>Initialize Your Solana Program</h2>
            <form onSubmit={handleInit} style={{ maxWidth: '300px', margin: "auto", display: 'block' }}>

                <input
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                    type="text"
                    placeholder="Token Name..."
                    required
                    minlen={2}
                />

                <input
                    value={symbol}
                    onChange={e => setSymbol(e.currentTarget.value)}
                    type="text"
                    placeholder="Token Symbol"
                    required
                    minlen={2}
                />

                <input
                    value={uri}
                    onChange={e => setUri(e.currentTarget.value)}
                    type="text"
                    placeholder="Url"
                    required
                    minlen={2}
                />
                <button type="submit" style={{ padding: "10px 20px " }}>Initialize</button>
            </form>
        </div>
    )
}

export default InitSolanaProgram;
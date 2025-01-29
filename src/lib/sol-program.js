import { clusterApiUrl, Keypair, PublicKey } from '@solana/web3.js';
import idl from '../anchor/idl.json';
import { Program, AnchorProvider, Wallet, web3 } from '@coral-xyz/anchor';
import { createInitializeAccountInstruction, createMint, getAccountLenForMint, getMint, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
    SystemProgram,
    Transaction,
} from "@solana/web3.js";
import {
    createInitializeMint2Instruction,
    getMinimumBalanceForRentExemptMint,
    MINT_SIZE,
} from "@solana/spl-token";

import {
    getMinimumBalanceForRentExemptAccount,
} from "@solana/spl-token";
/**
 * @typedef {import('../anchor/lucky_sol.ts').LuckySol} UserLuckySol
 */

/**
 * Initialize an Anchor program
 * @param {Wallet} wallet - The wallet object for the user
 * @returns {Program<UserLuckySol>} - The initialized Anchor program
 */
export function initProgram(wallet) {
    // Connect to the Solana devnet
    const connection = new web3.Connection(clusterApiUrl("devnet"));

    // Create an Anchor provider
    const provider = new AnchorProvider(connection, wallet);

    // Create a Program instance using the IDL and provider
    const program = new Program(idl, provider);

    return program;
}


/**
 * Initialize an Anchor program
 * @returns {Program<UserLuckySol>} - The initialized Anchor program
 */
export function getProgram() {
    // Connect to the Solana devnet
    const connection = new web3.Connection(clusterApiUrl("devnet"));

    // Create an Anchor provider
    const provider = new AnchorProvider(connection, { signAllTransactions: () => { }, signTransaction: () => { }, publicKey: "" });

    // Create a Program instance using the IDL and provider
    const program = new Program(idl, provider);

    return program;
}

export async function getGlobalState() {
    const program = getProgram();
    const address = PublicKey.findProgramAddressSync(
        [Buffer.from("global_state")],
        program.programId
    )[0];
    const globalState = await program.account.globalState.fetch(address, "confirmed").catch((e) => {
        return null;
    });

    return globalState && JSON.parse(JSON.stringify(globalState))
}

// export async function create_mint(
//     connection,
//     authority,
//     payer,
//     freezeAuthority = null,
//     decimals = 9
// ) {
//     const mint = Keypair.generate();
//     const mintAccount = await createMint(
//         connection,
//         payer,
//         authority,
//         freezeAuthority,
//         decimals,
//         mint,
//         undefined,
//         TOKEN_PROGRAM_ID
//     );

//     return mint;
// }


/**
 * Creates a new mint account using the wallet provider for signing.
 * @param {import('@coral-xyz/anchor').Provider} provider - The Solana connection object.
 * @param {PublicKey} authority - The public key of the mint authority.
 * @param {PublicKey} payer - The public key of the payer (wallet's public key).
 * @param {PublicKey | null} freezeAuthority - The public key of the freeze authority (optional).
 * @param {number} decimals - The number of decimals for the mint (default: 9).
 * @returns {Promise<Keypair>} - The keypair for the newly created mint.
 */
export async function create_mint(
    provider,
    signTransaction,
    authority,
    payer,
    freezeAuthority = null,
    decimals = 9
) {
    // Generate a new keypair for the mint (only the public key is used)
    const mint = Keypair.generate();

    // Calculate the rent-exempt lamports required for the mint account
    const lamports = await getMinimumBalanceForRentExemptMint(provider.connection);

    // Create a new transaction
    const transaction = new Transaction();

    transaction.feePayer = payer;
    transaction.recentBlockhash = (await provider.connection.getRecentBlockhash()).blockhash;

    // Add instruction to create the mint account
    transaction.add(
        SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: mint.publicKey,
            space: MINT_SIZE,
            lamports,
            programId: TOKEN_PROGRAM_ID,
        })
    );

    // Add instruction to initialize the mint
    transaction.add(
        createInitializeMint2Instruction(
            mint.publicKey,
            decimals,
            authority,
            freezeAuthority,
            TOKEN_PROGRAM_ID
        )
    );

    const signed = await signTransaction(transaction);

    signed.partialSign(mint)

    const txId = await provider.connection.sendRawTransaction(signed.serialize());
    await provider.connection.confirmTransaction(txId);
    console.log(txId);

    console.log("Mint created successfully:", mint.publicKey.toBase58());

    return mint;
}


const TOKEN_ACCOUNT_SIZE = 165; // Fixed size for token accounts

/**
 * Creates a new token account manually
 * @param {import('@coral-xyz/anchor').Provider} provider - The provider
 * @param {Function} signTransaction - Wallet's signTransaction method
 * @param {PublicKey} mint - Mint public key
 * @param {PublicKey} owner - Owner of the token account
 * @param {PublicKey} payer - Payer public key
 * @returns {Promise<Keypair>} - Keypair for the new token account
 */
export async function create_token_account(
    provider,
    signTransaction,
    mint,
    owner,
    payer
) {
    // Generate keypair for new token account
    const tokenAccount = Keypair.generate();

    // Calculate rent exemption
    const lamports = await getMinimumBalanceForRentExemptAccount(
        provider.connection
    );

    // Build transaction
    const transaction = new Transaction();
    transaction.feePayer = payer;
    transaction.recentBlockhash = (await provider.connection.getRecentBlockhash()).blockhash;

    // 1. Create account instruction
    transaction.add(
        SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: tokenAccount.publicKey,
            space: TOKEN_ACCOUNT_SIZE,
            lamports,
            programId: TOKEN_PROGRAM_ID,
        })
    );

    // 2. Initialize account instruction
    transaction.add(
        createInitializeAccountInstruction(
            tokenAccount.publicKey, // token account
            mint,                   // mint
            owner,                  // owner
            TOKEN_PROGRAM_ID
        )
    );

    // Sign and send
    const signedTx = await signTransaction(transaction);
    signedTx.partialSign(tokenAccount); // Must sign with new account keypair

    const txid = await provider.connection.sendRawTransaction(signedTx.serialize());
    await provider.connection.confirmTransaction(txid);

    console.log("Token account created:", tokenAccount.publicKey.toBase58());
    return tokenAccount;
}

export const findMasterEditionPda = (mint) => {
    return PublicKey.findProgramAddressSync(
        [
            Buffer.from("metadata"),
            new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s").toBuffer(),
            mint.toBuffer(),
            Buffer.from("edition") // <-- This is the key difference from metadata PDA
        ],
        new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s") // Token Metadata Program ID
    );
};


import { Metaplex } from "@metaplex-foundation/js";
import { LotteryState } from "../schemas/LotteryState";
import { PublicKey } from "@solana/web3.js";
// import { LuckySol, IDL } from "../../../anchor/idl";
import { IdlAccounts, Program, AnchorProvider } from "@coral-xyz/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { getProgram } from "../../../lib/sol-program";

const program = getProgram();
class SolanaLottery {
  constructor(connection) {
    this.connection = connection;
    this.metaplex = Metaplex.make(connection);
    const _idl = {
      address: "5hpeVw74cYJNfbASxss5zRvLygiUWdinHEJCruPoCd1a",
      metadata: {
        name: "lucky_sol",
        version: "0.1.0",
        spec: "0.1.0",
        description: "Created with Anchor",
      },
      instructions: [
        {
          name: "create_lottery",
          discriminator: [242, 165, 247, 119, 17, 203, 21, 42],
          accounts: [
            {
              name: "lottery_creator",
              writable: true,
              signer: true,
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "global_state",
              writable: true,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 95, 115, 116, 97, 116, 101,
                    ],
                  },
                ],
              },
            },
            {
              name: "mint",
            },
            {
              name: "lottery",
              writable: true,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      108, 111, 116, 116, 101, 114, 121, 45, 115, 116, 97, 116,
                      101,
                    ],
                  },
                  {
                    kind: "account",
                    path: "ticket_mint",
                  },
                ],
              },
            },
            {
              name: "lottery_token_account",
            },
            {
              name: "lottery_central_authority",
              writable: true,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      108, 111, 116, 116, 101, 114, 121, 45, 99, 101, 110, 116,
                      114, 97, 108, 45, 97, 117, 116, 104, 111, 114, 105, 116,
                      121,
                    ],
                  },
                ],
              },
            },
            {
              name: "ticket_mint",
            },
            {
              name: "lottery_collection_mint",
            },
            {
              name: "ticket_mint_metadata",
              writable: true,
            },
            {
              name: "lottery_collection_master",
              writable: true,
            },
            {
              name: "lottery_collection_metadata",
              writable: true,
            },
            {
              name: "rent",
              address: "SysvarRent111111111111111111111111111111111",
            },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "token_program",
              address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            },
            {
              name: "token_metadata_program",
              address: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
            },
          ],
          args: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "symbol",
              type: "string",
            },
            {
              name: "uri",
              type: "string",
            },
            {
              name: "ticket_price",
              type: "u64",
            },
            {
              name: "max_tickets",
              type: "u16",
            },
            {
              name: "max_tickets_per_user",
              type: "u8",
            },
            {
              name: "end_time",
              type: "i64",
            },
            {
              name: "prize_distribution",
              type: "bytes",
            },
          ],
        },
        {
          name: "initialize",
          discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
          accounts: [
            {
              name: "global_state",
              writable: true,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 95, 115, 116, 97, 116, 101,
                    ],
                  },
                ],
              },
            },
            {
              name: "master_edition_account",
              writable: true,
            },
            {
              name: "initializer",
              writable: true,
              signer: true,
            },
            {
              name: "lottery_collection_mint",
              writable: true,
            },
            {
              name: "initializer_token_account",
              writable: true,
              pda: {
                seeds: [
                  {
                    kind: "account",
                    path: "initializer",
                  },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  {
                    kind: "account",
                    path: "lottery_collection_mint",
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "collection_metadata",
              writable: true,
            },
            {
              name: "lottery_central_authority",
              writable: true,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      108, 111, 116, 116, 101, 114, 121, 45, 99, 101, 110, 116,
                      114, 97, 108, 45, 97, 117, 116, 104, 111, 114, 105, 116,
                      121,
                    ],
                  },
                ],
              },
            },
            {
              name: "token_program",
              address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "token_metadata_program",
              address: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
            },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "rent",
              address: "SysvarRent111111111111111111111111111111111",
            },
          ],
          args: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "symbol",
              type: "string",
            },
            {
              name: "uri",
              type: "string",
            },
          ],
        },
        {
          name: "purchase_lottery_ticket",
          discriminator: [192, 242, 121, 224, 98, 1, 35, 54],
          accounts: [
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "lottery",
              writable: true,
            },
            {
              name: "buyer",
              writable: true,
              signer: true,
            },
            {
              name: "buyer_token_account",
              writable: true,
              pda: {
                seeds: [
                  {
                    kind: "account",
                    path: "buyer",
                  },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  {
                    kind: "account",
                    path: "lottery.token_mint",
                    account: "LotteryState",
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "ticket_mint",
              writable: true,
            },
            {
              name: "lottery_token_account",
              writable: true,
            },
            {
              name: "buyer_ticket_account",
              writable: true,
              pda: {
                seeds: [
                  {
                    kind: "account",
                    path: "buyer",
                  },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  {
                    kind: "account",
                    path: "ticket_mint",
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "lottery_central_authority",
              writable: true,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      108, 111, 116, 116, 101, 114, 121, 45, 99, 101, 110, 116,
                      114, 97, 108, 45, 97, 117, 116, 104, 111, 114, 105, 116,
                      121,
                    ],
                  },
                ],
              },
            },
            {
              name: "token_program",
              address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            },
            {
              name: "token_metadata_program",
              address: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
            },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "rent",
              address: "SysvarRent111111111111111111111111111111111",
            },
          ],
          args: [
            {
              name: "number_of_tickets",
              type: "u16",
            },
          ],
        },
        {
          name: "set_winner",
          discriminator: [207, 149, 39, 13, 31, 233, 182, 109],
          accounts: [
            {
              name: "global_state",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 95, 115, 116, 97, 116, 101,
                    ],
                  },
                ],
              },
            },
            {
              name: "lottery",
              writable: true,
            },
            {
              name: "lottery_master",
              signer: true,
            },
            {
              name: "lottery_central_authority",
              writable: true,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      108, 111, 116, 116, 101, 114, 121, 45, 99, 101, 110, 116,
                      114, 97, 108, 45, 97, 117, 116, 104, 111, 114, 105, 116,
                      121,
                    ],
                  },
                ],
              },
            },
            {
              name: "lottery_token_account",
              writable: true,
            },
            {
              name: "token_program",
              address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            },
          ],
          args: [],
        },
      ],
      accounts: [
        {
          name: "GlobalState",
          discriminator: [163, 46, 74, 168, 216, 123, 133, 98],
        },
        {
          name: "LotteryState",
          discriminator: [196, 210, 202, 219, 204, 63, 133, 85],
        },
      ],
      errors: [
        {
          code: 6000,
          name: "ExceedsMaxTicketsPerUser",
          msg: "The maximum number of tickets per user is exceeded.",
        },
        {
          code: 6001,
          name: "MaxTicketsIssued",
          msg: "The maximum number of tickets for the lottery has been issued.",
        },
        {
          code: 6002,
          name: "PDACreationFailed",
          msg: "Failed to create PDA.",
        },
        {
          code: 6003,
          name: "InvalidPrizeDistribution",
          msg: "Invalid prize distribution",
        },
        {
          code: 6004,
          name: "CalculationOverflow",
          msg: "Calculation overflow occurred.",
        },
        {
          code: 6005,
          name: "CollectionVerificationFailed",
          msg: "verification of collection failed.",
        },
        {
          code: 6006,
          name: "MasterEditionCreationFailed",
          msg: "Creation of Master Edition failed.",
        },
      ],
      types: [
        {
          name: "GlobalState",
          type: {
            kind: "struct",
            fields: [
              {
                name: "lotteries",
                type: "u64",
              },
              {
                name: "lottery_master",
                type: "pubkey",
              },
              {
                name: "lottery_collection_mint",
                type: "pubkey",
              },
            ],
          },
        },
        {
          name: "LotteryState",
          type: {
            kind: "struct",
            fields: [
              {
                name: "ticket_price",
                type: "u64",
              },
              {
                name: "max_tickets",
                type: "u16",
              },
              {
                name: "max_tickets_per_user",
                type: "u8",
              },
              {
                name: "prize_distribution",
                type: "bytes",
              },
              {
                name: "ticket_mint",
                type: "pubkey",
              },
              {
                name: "token_mint",
                type: "pubkey",
              },
              {
                name: "token_account",
                type: "pubkey",
              },
              {
                name: "end_time",
                type: "i64",
              },
              {
                name: "is_active",
                type: "bool",
              },
            ],
          },
        },
      ],
    };

    // const provider = new AnchorProvider(connection, {
    //   commitment: "confirmed",
    // });
    // this.program = new Program(_idl, programId, {
    //   connection,
    // });

    // console.log(this.program.methods);
  }

  getLotteries = async () => {

    const accounts = await program.account.lotteryState.all();
    console.log(accounts);

    let state_array = [];

    await Promise.all(
      accounts.map(async ({ pubkey, account: state }) => {
        const data = await this.getMetadata(
          program.provider.connection,
          state.ticketMint.toString(),
          state.tokenMint.toString()
        ).catch((error) => null);

        if (!data) return;
        const [metadata, feeToken] = data;

        // update remaining fields with metadata
        state.name = metadata.name;
        state.symbol = metadata.symbol;
        state.tokenSymbol = feeToken.symbol;

        state_array.push(state);
      })
    );

    let lotteryData = state_array.map((el, index) => {
      return {
        id: index,
        // creator: el.creator,
        creator: "",
        lotteryAddress: el.ticketMint,
        name: el.name,
        symbol: el.symbol,
        ticketPrice: el.ticketPrice.toString(),
        maxTickets: el.maxTickets,
        maxWinners: el.prizeDistribution.length,
        endDate: el.endTime,
        // charity: el.charity,
        charity: "",
        feeToken: el.tokenMint.toString(),
        // creatorFee: el.creatorFee,
        creatorFee: "",
        // charityFee: el.charityFee,
        charityFee: "",
        prizeDistribution: el.prizeDistribution,
        maxTicketsPerWallet: el.maxTicketsPerWallet,
        // startTime: el.startTime,
        startTime: "",
        tokenSymbol: el.tokenSymbol,
        decimals: 9,
      };
    });
    return lotteryData;
  };

  getMetadata = async (connection, tokenAddress, feeToken) => {
    const metaplex = Metaplex.make(connection);
    const ticketMintMetadata = await metaplex
      .nfts()
      .findByMint({ mintAddress: new PublicKey(tokenAddress) });

    const feeTokenMetadata = await metaplex
      .nfts()
      .findByMint({ mintAddress: new PublicKey(feeToken) });

    return [ticketMintMetadata, feeTokenMetadata];
  };

  async getLotteryDetails(lotteryAddress) {
    console.log(lotteryAddress);
    const lotterypubkey = new PublicKey(lotteryAddress);
    console.log(lotterypubkey);
    const lottery_state_key = PublicKey.findProgramAddressSync(
      [Buffer.from("lottery-state"), lotterypubkey.toBuffer()],
      new PublicKey("5hpeVw74cYJNfbASxss5zRvLygiUWdinHEJCruPoCd1a")
    )[0];
    // Use Metaplex to fetch Solana lottery details
    const accountData = await this.connection.getAccountInfo(lottery_state_key);
    try {
      const lottery_state = LotteryState.deserialize(accountData.data);

      const [metadata, feeTokenMetadata] = await this.getMetadata(
        this.connection,
        lottery_state.ticketMint.toString(),
        lottery_state.tokenMint.toString()
      );

      console.log(feeTokenMetadata);

      // update remaining fields with metadata
      lottery_state.name = metadata.name;
      lottery_state.symbol = metadata.symbol;
      lottery_state.tokenSymbol = feeTokenMetadata.symbol;
      lottery_state.feeTokenDecimals = feeTokenMetadata.mint.decimals;
      //   const metadata = await this.metaplex.tokens().findMintWithMetadata({
      //     mintAddress: new PublicKey(lotteryAddress),
      //   });

      // Assume data is stored in metadata
      //   return {
      //     charity: metadata.data.uri.charity,
      //     charityFee: metadata.data.uri.charityFee,
      //     creator: metadata.data.uri.creator,
      //     creatorFee: metadata.data.uri.creatorFee,
      //     endDate: metadata.data.uri.endDate,
      //     feeToken: metadata.data.uri.feeToken,
      //     id: lotteryAddress,
      //     lotteryAddress: lotteryAddress,
      //     maxTickets: metadata.data.uri.maxTickets,
      //     maxTicketsPerWallet: metadata.data.uri.maxTicketsPerWallet,
      //     maxWinners: metadata.data.uri.maxWinners,
      //     name: metadata.data.name,
      //     startTime: metadata.data.uri.startTime,
      //     symbol: metadata.data.symbol,
      //     ticketPrice: metadata.data.uri.ticketPrice,
      //     tokenSymbol: metadata.data.uri.tokenSymbol,
      //   };

      console.log(lottery_state);
      return lottery_state;
    } catch (error) {
      throw new Error(`Solana Lottery fetch failed: ${error.message}`);
    }
  }
}

export default SolanaLottery;

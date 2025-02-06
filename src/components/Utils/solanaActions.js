import { PublicKey } from "@solana/web3.js";
import { LotteryState } from "./schemas/LotteryState.js";
import { Metaplex } from "@metaplex-foundation/js";
// import * from "@metaplex/js";

const getMetadata = async (connection, tokenAddress, feeToken) => {
  const metaplex = Metaplex.make(connection);
  const ticketMintMetadata = await metaplex
    .nfts()
    .findByMint({ mintAddress: new PublicKey(tokenAddress) });

  const feeTokenMetadata = await metaplex
    .nfts()
    .findByMint({ mintAddress: new PublicKey(feeToken) });

  return [ticketMintMetadata, feeTokenMetadata.symbol];
};

export const fetchLotteriesSolana = async (networkConnection) => {
  const connection = networkConnection;

  //   const umi = createUmi("https://api.devnet.solana.com").use(defaultPlugins()); // Load essential plugins

  // Define filters
  const filters = [
    {
      // Data size filter: Only return accounts with 128 bytes of data
      dataSize: 138,
    },
  ];

  // Fetch accounts with filters
  const accounts = await connection.getProgramAccounts(
    new PublicKey("5hpeVw74cYJNfbASxss5zRvLygiUWdinHEJCruPoCd1a"),
    {
      filters: filters,
    }
  );

  let state_array = [];

  await Promise.all(
    accounts.map(async ({ pubkey, account }) => {
      let state = LotteryState.deserialize(account.data);
      const [metadata, feeTokenSymbol] = await getMetadata(
        connection,
        state.ticketMint.toString(),
        state.tokenMint.toString()
      );

      // update remaining fields with metadata
      state.name = metadata.name;
      state.symbol = metadata.symbol;
      state.tokenSymbol = feeTokenSymbol;

      state_array.push(state);
      //   console.log(state_array);
    })
  );

  return state_array;
};

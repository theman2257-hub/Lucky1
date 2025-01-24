import { createClient, cacheExchange, fetchExchange } from "@urql/core";
import * as web3 from "@solana/web3.js";

export const chainDict = {
  56: "BNB Smart Chain",
  97: "Binance Smart Chain Testnet",
  42161: "Arbitrum One",
};

export const bscClient = createClient({
  url: "https://subgraph.satsuma-prod.com/6efe7c2e76c3/alchemy-test--384075/example-subgraph-name/version/v0.0.2-new-version/api",
  exchanges: [cacheExchange, fetchExchange],
});

export const arbitrumClient = createClient({
  url: "https://api.thegraph.com/subgraphs/name/sallystix/arb-lottery",
  exchanges: [cacheExchange, fetchExchange],
});

export const getEvmClient = (chainName) => {
  console.log(chainName);
  if (chainName === "BNB Smart Chain") return bscClient;
  else if (chainName === "Arbitrum One") return arbitrumClient;
  else {
    return bscClient;
  }
};

export const getSolanaConnection = () => {
  let connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );

  return connection;
};

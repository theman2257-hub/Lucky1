import { createClient, cacheExchange, fetchExchange } from "@urql/core";

export const chainDict = {
  56: "BNB Smart Chain",
  42161: "Arbitrum One",
};

export const bscClient = createClient({
  url: "https://api.thegraph.com/subgraphs/name/sallystix/test-lottery",
  exchanges: [cacheExchange, fetchExchange],
});

export const arbitrumClient = createClient({
  url: "https://api.thegraph.com/subgraphs/name/sallystix/arb-lottery",
  exchanges: [cacheExchange, fetchExchange],
});

export const getClient = (chainName) => {
  console.log(chainName);
  if (chainName === "BNB Smart Chain") return bscClient;
  else if (chainName === "Arbitrum One") return arbitrumClient;
};

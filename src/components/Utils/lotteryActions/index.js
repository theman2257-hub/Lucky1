import EVMLottery from "./evmLotteryActions";
import SolanaLottery from "./solanaLotteryActions";
import {
  evm_chain_ids,
  evm_graph_urls,
  solana_chain_ids,
} from "../../../constants/chainInfo";
import { createClient, cacheExchange, fetchExchange } from "@urql/core";
import * as web3 from "@solana/web3.js";

class LotteryDetails {
  constructor({ chainId }) {
    this.chainId = chainId;
    this.instance = null;

    if (evm_chain_ids.includes(chainId)) {
      const client = createClient({
        url: evm_graph_urls[chainId],
        exchanges: [cacheExchange, fetchExchange],
      });
      this.instance = new EVMLottery(client);
    } else if (solana_chain_ids.includes(chainId)) {
      let connection = new web3.Connection(
        web3.clusterApiUrl("devnet"),
        "confirmed"
      );
      this.instance = new SolanaLottery(connection);
    } else {
      throw new Error(`Unsupported chain ID ${chainId}`);
    }
    console.log(this.instance);
  }

  async getLotteryDetails(lotteryAddress) {
    if (!this.instance) {
      throw new Error("No valid lottery instance found");
    }
    const lottery_details = await this.instance.getLotteryDetails(
      lotteryAddress
    );
    console.log(lottery_details);
    return lottery_details;
  }

  async getLotteries() {
    return await this.instance.getLotteries();
  }
}

export default LotteryDetails;

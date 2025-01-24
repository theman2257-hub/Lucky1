import { ethers } from "ethers";

export default class EVMLottery {
  constructor(graphClient) {
    this.graphClient = graphClient;
  }

  async getLotteryDetails(lotteryAddress) {
    // Query the EVM GraphQL client
    const query = `{
        lottery(id: "${lotteryAddress}") {
          charity
          charityFee
          creator
          creatorFee
          endDate
          feeToken
          id
          lotteryAddress
          maxTickets
          maxTicketsPerWallet
          maxWinners
          name
          startTime
          symbol
          ticketPrice
          tokenSymbol
        }
      }`;

    try {
      const { data } = await this.graphClient.query(query).toPromise();
      console.log(data);

      return data.lottery;
    } catch (error) {
      throw new Error(`EVM Lottery fetch failed: ${error.message}`);
    }
  }

  async getLotteries() {
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
        endDate
        charity
        feeToken
        creatorFee
        charityFee
        maxTicketsPerWallet
        maxWinners
        startTime
        tokenSymbol
      }
    }`;
    const { data } = await this.graphClient.query(query).toPromise();
    console.log(data.lotteries);
    let rpc = "https://bsc-dataseed1.binance.org/";
    let provider = new ethers.providers.JsonRpcProvider(rpc);

    let lotteryData = data.lotteries.map((el, index) => {
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
        // prizeDistribution: el.prizeDistribution,
        maxTicketsPerWallet: el.maxTicketsPerWallet,
        startTime: el.startTime,
        tokenSymbol: el.tokenSymbol,
        decimals: 18,
      };
    });

    return lotteryData;
  }
}

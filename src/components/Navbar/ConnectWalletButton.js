import React, { Component } from "react";
import { useChain } from "../../wallet/WalletContext";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { solana_chain_ids, evm_chain_ids } from "../../constants/chainInfo";
import WagmiButton from "../WagmiButton";

function ConnectWalletButton() {
  const { chainId } = useChain();

  if (solana_chain_ids.includes(chainId)) {
    return <WalletMultiButton />;
  } else if (evm_chain_ids.includes(chainId)) {
    return <WagmiButton className="wallet-adapter-button-evm" />;
  }
}

export default ConnectWalletButton;
// export default class ConnectWalletButton extends Component {
//   constructor() {}

//   render() {
//     const { chainId } = useChain();

//   }
// }

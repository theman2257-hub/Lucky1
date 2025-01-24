import React, { createContext, useContext, useState, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http, useAccount } from "wagmi";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";
import { arbitrum, mainnet, bscTestnet, sepolia, bsc } from "wagmi/chains";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { EvmModalProvider } from "./EvmWallet/EvmWalletProvider";
import { Modal } from "../wallet/ChainModal";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  UnsafeBurnerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import Navbar from "../components/Navbar/Navbar";
require("@solana/wallet-adapter-react-ui/styles.css");

const projectId = "e4600bbdb356ec1f0d2dd8930ce3e74c";
const queryClient = new QueryClient();

const ChainContext = createContext();

export const config = createConfig({
  chains: [bscTestnet],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [bscTestnet.id]: http(),
  },
});

const network = WalletAdapterNetwork.Devnet;

export const ChainProvider = ({ children }) => {
  const [chainId, setChainId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  // chain selector modal
  const toggleModal = () => setModalOpen(!modalOpen);

  const solanaWallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [network]
  );

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  React.useEffect(() => {
    loadChainState();
  }, []);

  /**
   * Load the chain state from localStorage and set it in the state.
   * If no chain is found in localStorage, the state remains null.
   */
  function loadChainState() {
    const savedChainId = localStorage.getItem("selectedChainId");
    if (savedChainId) {
      setChainId(savedChainId); // Ensure chainId is stored as a number
    }
  }

  /**
   * Save the chain state to localStorage and update the chainId state.
   * @param {number} newChainId - The chain ID to be set and persisted
   */
  function setChainState(newChainId) {
    setChainId(newChainId);
    localStorage.setItem("selectedChainId", newChainId.toString());
  }

  return (
    <ChainContext.Provider value={{ chainId, setChainState }}>
      {chainId === "97" ? (
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <EvmModalProvider>{children}</EvmModalProvider>
          </QueryClientProvider>
        </WagmiProvider>
      ) : (
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={solanaWallets} autoConnect>
            <WalletModalProvider>
              {/* <WalletDisconnectButton /> */}

              {children}
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      )}
    </ChainContext.Provider>
  );
};

// Custom hooks for consuming context
export const useChain = () => useContext(ChainContext);

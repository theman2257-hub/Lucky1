import { useState, useEffect } from "react";
import { useChain } from "./WalletContext";
import {
  solana_chain_ids,
  evm_chain_ids,
  solana_chain_names,
  evm_chain_names,
} from "../constants/chainInfo";

const networks = [
  {
    id: solana_chain_ids[0],
    name: solana_chain_names[solana_chain_ids[0]],
    icon: "/solana-sol-logo.svg", // Replace with actual icon URL
  },
  {
    id: evm_chain_ids[1],
    name: evm_chain_names[evm_chain_ids[1]],
    icon: "/bsc-logo.png", // Replace with actual icon URL
  },
  // Add more networks here
];

export const Modal = ({ isOpen, onClose }) => {
  const { chainId, setChainState } = useChain();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Set loading to false once the chainId is loaded
  }, [chainId]);

  if ((chainId !== null || loading) && !isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* <h2>Select Network</h2> */}
        <div className="network-list">
          {networks.map((network) => (
            <div
              key={network.id}
              className={
                `network-item` + `${chainId === network.id ? "-selected" : ""}`
              }
              onClick={() => {
                setChainState(network.id);
              }}
            >
              <div className="network-item-container">
                <img
                  src={network.icon}
                  alt={network.name}
                  className="network-icon"
                />
                <div className="network-info">
                  <p className="network-name">{network.name}</p>
                  {/* <p className="network-id">Chain ID: {network.id}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

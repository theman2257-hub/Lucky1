import React from "react";
import { useConnect } from "wagmi";
import "./WalletSelectorModal.css";
import { useChain } from "../WalletContext";

const WalletSelectorModal = ({ visible, onClose }) => {
  const { connectors, connect } = useConnect();
  const { chainId } = useChain();

  const handleOverlayClick = (e) => {
    // Ensure the click is on the overlay, not the modal content
    if (e.target.classList.contains("wallet-modal-wrapper")) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={`wallet-modal-wrapper ${visible ? "visible" : ""}`}
    >
      <div className="wallet-modal-content">
        <div className="wallet-modal-header">
          <div className="modal-header-container">
            <h3>Select a Wallet</h3>
          </div>
          <button className="wallet-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <ul className="wallet-modal-list">
          {connectors
            .filter(
              (connector) =>
                connector.id === "metaMaskSDK" ||
                connector.id === "walletConnect" ||
                connector.id === "app.phantom"
            )
            .map((connector) => (
              <li
                key={connector.id}
                className="wallet-modal-item"
                onClick={() => {
                  connect({ connector });
                }}
              >
                <div className="modal-connector-container">
                  {connector.id === "metaMaskSDK" && (
                    <img
                      className="wallet-modal-icon"
                      src="/metamask-icon.svg"
                      alt="MetaMask"
                    />
                  )}
                  {connector.id === "walletConnect" && (
                    <img
                      className="wallet-modal-icon"
                      src="https://cdn.iconscout.com/icon/free/png-256/wallet-connect-3629179-3030001.png"
                      alt="WalletConnect"
                    />
                  )}
                  {connector.id === "app.phantom" && (
                    <img
                      className="wallet-modal-icon"
                      src="/phantom-icon.svg"
                    />
                  )}
                  <span className="wallet-modal-name">{connector.name}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default WalletSelectorModal;

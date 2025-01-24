import { React, useState, useRef, useEffect, useMemo } from "react";
import { useAccount } from "wagmi";
import { useEvmModal } from "../../wallet/EvmWallet/EvmWalletProvider";
import { useDisconnect } from "wagmi";
function WagmiButton({ ...props }) {
  const { isConnected, address, chainId } = useAccount();
  const { disconnect } = useDisconnect();

  const { handleToggle } = useEvmModal();
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const labels = {
    "change-wallet": "Change wallet",
    connecting: "Connecting ...",
    "copy-address": "Copy address",
    copied: "Copied",
    disconnect: "Disconnect",
    "has-wallet": "Connect",
    "no-wallet": "Select Wallet",
  };

  const ref = useRef(null);
  useEffect(() => {
    const listener = (event) => {
      const node = ref.current;

      // Do nothing if clicking dropdown or its descendants
      if (!node || node.contains(event.target)) return;

      setMenuOpen(false);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, []);

  return (
    <div className="wallet-adapter-dropdown">
      <button
        {...props}
        onClick={() => {
          if (!isConnected) {
            handleToggle();
          } else {
            setMenuOpen(true);
          }
        }}
      >
        {isConnected
          ? address.substring(0, 5) + ".." + address.substring(37, 42)
          : "Select Wallet"}
      </button>
      <ul
        aria-label="dropdown-list"
        className={`wallet-adapter-dropdown-list ${
          menuOpen && "wallet-adapter-dropdown-list-active"
        }`}
        ref={ref}
        role="menu"
      >
        {address ? (
          <li
            className="wallet-adapter-dropdown-list-item"
            onClick={async () => {
              await navigator.clipboard.writeText(address);
              setCopied(true);
              setTimeout(() => setCopied(false), 400);
            }}
            role="menuitem"
          >
            {copied ? labels["copied"] : labels["copy-address"]}
          </li>
        ) : null}
        {isConnected ? (
          <li
            className="wallet-adapter-dropdown-list-item"
            onClick={() => {
              handleToggle();
              setMenuOpen(false);
            }}
            role="menuitem"
          >
            {labels["change-wallet"]}
          </li>
        ) : null}
        {isConnected ? (
          <li
            className="wallet-adapter-dropdown-list-item"
            onClick={() => {
              disconnect();
              setMenuOpen(false);
            }}
            role="menuitem"
          >
            {labels["disconnect"]}
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export default WagmiButton;

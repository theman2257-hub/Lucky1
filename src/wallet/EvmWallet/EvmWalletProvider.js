import React, { createContext, useContext, useState, useMemo } from "react";
import WalletSelectorModal from "./EvmModal";

const EvmModalContext = createContext();

export const EvmModalProvider = ({ children }) => {
  const [isOpen, toggleModal] = useState(false);

  const handleToggle = () => {
    toggleModal(!isOpen);
  };

  return (
    <EvmModalContext.Provider value={{ isOpen, handleToggle }}>
      <WalletSelectorModal visible={isOpen} onClose={handleToggle} />
      {children}
    </EvmModalContext.Provider>
  );
};

// Custom hooks for consuming context
export const useEvmModal = () => useContext(EvmModalContext);

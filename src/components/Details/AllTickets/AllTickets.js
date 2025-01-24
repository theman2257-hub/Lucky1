import React from "react";
import { useChain } from "../../../wallet/WalletContext";
import AllTicketsEvm from "./AllTicketsEvm";

function AllTickets() {
  const { chainId } = useChain();
  return chainId == "97" ? <AllTicketsEvm /> : null;
}

export default AllTickets;

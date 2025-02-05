import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Details from "./pages/Details/Details";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import CreateLottery from "./pages/CreateLottery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http, useAccount } from "wagmi";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";
import { Account } from "./wallet/Account";
import { WalletOptions } from "./wallet/WalletOptions";
import { Modal } from "./wallet/ChainModal";
import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { arbitrum, mainnet, bscTestnet, sepolia, bsc } from "wagmi/chains";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { ToastContainer, toast } from "react-toastify";
import Profile from "./pages/Profile/Profile";
import Privacy from "./components/Privacy/Privacy";
import Contact from "./components/Contact/Contact";
import HowitWorks from "./pages/HowItWorks/HowitWorks";
import UserGuide from "./components/UserGuide/UserGuide";
import FAQs from "./components/FAQ/FAQs";
import WhitePaper from "./components/WhitePaper/WhitePaper";
import { ChainProvider, useChain } from "./wallet/WalletContext";
import { RecoilRoot } from "recoil";
const projectId = "e4600bbdb356ec1f0d2dd8930ce3e74c";

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [bscTestnet],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [bscTestnet.id]: http(),
  },
});

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  // chain selector modal
  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <RecoilRoot>
      <ChainProvider>
        <Modal isOpen={modalOpen} onClose={toggleModal} />
        <Navbar openSelectNetwork={toggleModal} />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />}></Route>{" "}
          <Route
            path="/createLottery/:affiliateAddress?"
            element={<CreateLottery />}
          />
          <Route
            path="/:chainIdParam/:id/:affiliateAddress?"
            element={<Details />}
          ></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/HowItWorks" element={<HowitWorks />}></Route>
          <Route path="/userGuide" element={<UserGuide />}></Route>
          <Route path="/faqs" element={<FAQs />}></Route>
          <Route path="/whitePaper" element={<WhitePaper />}></Route>
          <Route path="/privacy" element={<Privacy />}>
            {" "}
          </Route>
          <Route path="/contact" element={<Contact />}>
            {" "}
          </Route>
        </Routes>
        <Footer />
      </ChainProvider>
    </RecoilRoot>
  );
}

export default App;

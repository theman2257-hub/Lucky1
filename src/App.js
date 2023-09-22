import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Details from "./pages/Details/Details";
import Home from "./pages/Home/Home";
import CreateLottery from "./pages/CreateLottery/CreateLottery";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, bscTestnet, sepolia, bsc } from "wagmi/chains";
import { ToastContainer, toast } from "react-toastify";
import Profile from "./pages/Profile/Profile";
import Privacy from "./components/Privacy/Privacy";
import Contact from "./components/Contact/Contact";
const chains = [bsc];
const projectId = "e4600bbdb356ec1f0d2dd8930ce3e74c";

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Navbar />
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />}></Route>{" "}
          <Route
            path="/createLottery/:affiliateAddress?"
            element={<CreateLottery />}
          />
          <Route path="/:id/:affiliateAddress?" element={<Details />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/privacy" element={<Privacy />}>
            {" "}
          </Route>
          <Route path="/contact" element={<Contact />}>
            {" "}
          </Route>
        </Routes>
        <Footer />
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;

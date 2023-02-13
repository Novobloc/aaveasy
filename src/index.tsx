import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider, CHAIN } from "@arcana/auth";
import { ethers } from "ethers";

import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import "./index.css";

// import { GlobalProvider } from "./context/GlobalContext/GlobalContext";

const appAddress = "f15f444552fd0b88c80f0373f7c4433b585a74da";

const auth = new AuthProvider(`${appAddress}`, {
  chainConfig: {
    chainId: CHAIN.ETHEREUM_GOERLI, //defaults to CHAIN.ETHEREUM_MAINNET
    rpcUrl: "https://side-fabled-violet.ethereum-goerli.discover.quiknode.pro/16bf13dae688d98d4fed25a482585b3ede55c6e0/" //defaults to 'https://rpc.ankr.com/eth'
  }
});

const initialize = async () => {
  try {
    await auth.init();
    console.log("asdf");

    // const arcanaProvider = await auth.loginWithLink("shiva2nani.mangina@gmail.com");
    // const provider = new ethers.providers.Web3Provider(arcanaProvider);

    const blno = await auth.getUser();
    console.log("blno: ", blno);
    // 14983200
  } catch (e) {
    console.log("e: ", e);
    // log error
  }
};

const element = document.getElementById("root");
const root = createRoot(element!);

const Index = () => {
  useEffect(() => {
    initialize();
  }, []);

  return (
    <React.StrictMode>
      {/* <GlobalProvider> */}
      <App />
      {/* </GlobalProvider> */}
    </React.StrictMode>
  );
};

root.render(<Index />);

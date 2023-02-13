import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider, CHAIN } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";

import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import "./index.css";

import { GlobalProvider } from "./context/GlobalContext/GlobalContext";

const appAddress = "f15f444552fd0b88c80f0373f7c4433b585a74da";

const provider = new AuthProvider(`${appAddress}`, {
  chainConfig: {
    chainId: CHAIN.ETHEREUM_GOERLI, //defaults to CHAIN.ETHEREUM_MAINNET
    rpcUrl: "https://side-fabled-violet.ethereum-goerli.discover.quiknode.pro/16bf13dae688d98d4fed25a482585b3ede55c6e0/" //defaults to 'https://rpc.ankr.com/eth'
  }
});

const element = document.getElementById("root");
const root = createRoot(element!);

const Index = () => {
  return (
    <React.StrictMode>
      <ProvideAuth provider={provider}>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </ProvideAuth>
    </React.StrictMode>
  );
};

root.render(<Index />);

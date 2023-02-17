import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider, CHAIN } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";

import App from "./App";
import "./index.css";

import { GlobalProvider, useGlobalContext } from "./context/GlobalContext/GlobalContext";

const appAddress = "f15f444552fd0b88c80f0373f7c4433b585a74da";

const provider = new AuthProvider(`${appAddress}`, {
  chainConfig: {
    chainId: CHAIN.ETHEREUM_GOERLI, //defaults to CHAIN.ETHEREUM_MAINNET
    rpcUrl: "https://side-fabled-violet.ethereum-goerli.discover.quiknode.pro/16bf13dae688d98d4fed25a482585b3ede55c6e0/"
  }
});

const element = document.getElementById("root");
const root = createRoot(element!);

const Index = () => {
  // const { appLoading } = useGlobalContext();
  // console.log("appLoading: ", appLoading);

 

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

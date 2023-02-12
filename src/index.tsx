import React from "react";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import "./index.css";

import { Web3AuthProvider } from "./context/SocialLoginContext/SocialLoginContext";
import { SmartAccountProvider } from "./context/SmartAccountContext/SmartAccountContext";
import { GlobalProvider } from "./context/GlobalContext/GlobalContext";

const element = document.getElementById("root");
const root = createRoot(element!);

const Index = () => {
  return (
    <GlobalProvider>
      <Web3AuthProvider>
        <SmartAccountProvider>
          <div className="app-container app-theme-white flex flex-col w-full text-gray-700 bg-white">
            <App />
          </div>
        </SmartAccountProvider>
      </Web3AuthProvider>
    </GlobalProvider>
  );
};

root.render(<Index />);

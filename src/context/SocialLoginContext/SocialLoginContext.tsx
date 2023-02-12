import React, { useCallback, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import SocialLogin from "@biconomy/web3-auth";
import { activeChainId } from "../../utils/chainConfig";
import { web3AuthContextType } from "../types";
import { initialState, w3state } from "./initialState";
import { StateType } from "../types";
import { whitelistUrls } from "../../utils/contants";
import { useGlobalContext } from "../GlobalContext/GlobalContext";

export const Web3AuthContext = React.createContext<web3AuthContextType>(initialState);

// TODO: Change to reducers anf actions
export const Web3AuthProvider = ({ children }: any) => {
  const { setAppLoading } = useGlobalContext();

  const [web3State, setWeb3State] = useState<StateType>(w3state);
  const { provider, web3Provider, ethersProvider, address, chainId, userInfo } = web3State;

  // ? TODO: Loading to global state
  const [loading, setLoading] = useState(false);

  // Contains all the information about the SocialLOgain
  const [socialLoginSDK, setSocialLoginSDK] = useState<SocialLogin | null>(null);
  const deployedUrl = "";
  /**
   * create socialLoginSDK and call the init
   */
  useEffect(() => {
    const initWallet = async () => {
      const sdk = new SocialLogin();
      const signature = await sdk.whitelistUrl(deployedUrl);
      const customWhiteListUrls = {
        ...whitelistUrls,
        deployedUrl: signature
      };

      await sdk.init(ethers.utils.hexValue(activeChainId), customWhiteListUrls); // '0x5' for Goerli

      sdk.showConnectModal();
      setSocialLoginSDK(sdk);
    };
    if (!socialLoginSDK) initWallet();
  }, [socialLoginSDK]);

  /**
   * If wallet already connected close widget
   */
  useEffect(() => {
    if (socialLoginSDK && address) {
      setAppLoading(false);
      socialLoginSDK.hideWallet();
    }
  }, [address, socialLoginSDK]);

  /**
   * Connect wallet
   */
  const connect = useCallback(async () => {
    if (address) return;
    if (socialLoginSDK?.provider) {
      setLoading(true);
      const web3Provider = new ethers.providers.Web3Provider(socialLoginSDK.provider);
      const signer = web3Provider.getSigner();
      const gotAccount = await signer.getAddress();
      const network = await web3Provider.getNetwork();
      const userInfo = await socialLoginSDK.getUserInfo();

      setWeb3State({
        provider: socialLoginSDK.provider,
        web3Provider: web3Provider,
        ethersProvider: web3Provider,
        address: gotAccount,
        chainId: Number(network.chainId),
        userInfo
      });
      setLoading(false);
      return;
    }

    if (socialLoginSDK) {
      socialLoginSDK.showWallet();
      return socialLoginSDK;
    }
    setLoading(true);

    const sdk = new SocialLogin();
    const signature = await sdk.whitelistUrl("https://transak-biconomy.netlify.app");
    const customWhiteListUrls = {
      ...whitelistUrls,
      "https://transak-biconomy.netlify.app": signature
    };

    await sdk.init(ethers.utils.hexValue(activeChainId), customWhiteListUrls); // '0x5' for Goerli
    sdk.showConnectModal();
    sdk.showWallet();
    setSocialLoginSDK(sdk);
    setLoading(false);
    return socialLoginSDK;
  }, [address, socialLoginSDK]);

  /**
   * after social login -> set provider info
   */
  useEffect(() => {
    (async () => {
      if (socialLoginSDK?.provider && !address) {
        connect();
      }
    })();
  }, [address, connect, socialLoginSDK, socialLoginSDK?.provider]);

  /**
   * After metamask login -> get provider event
   */
  useEffect(() => {
    const interval = setInterval(async () => {
      if (address) {
        clearInterval(interval);
      }
      if (socialLoginSDK?.provider && !address) {
        connect();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [address, connect, socialLoginSDK]);

  /**
   * Disconnect wallet
   */
  const disconnect = useCallback(async () => {
    if (!socialLoginSDK || !socialLoginSDK.web3auth) {
      return;
    }
    await socialLoginSDK.logout();
    setWeb3State({
      provider: null,
      web3Provider: null,
      ethersProvider: null,
      address: "",
      chainId: activeChainId,
      userInfo: null
    });
    socialLoginSDK.hideWallet();
  }, [socialLoginSDK]);

  return (
    <Web3AuthContext.Provider
      value={{
        connect,
        disconnect,
        loading,
        provider: provider,
        ethersProvider: ethersProvider || null,
        web3Provider: web3Provider || null,
        chainId: chainId || 0,
        address: address || "",
        userInfo: userInfo || null
      }}>
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3AuthContext = () => useContext(Web3AuthContext);

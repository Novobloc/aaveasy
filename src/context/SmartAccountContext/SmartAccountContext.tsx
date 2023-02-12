import React, { useCallback, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import SmartAccount from "@biconomy/smart-account";
import { SmartAccountState, SmartAccountVersion } from "@biconomy/core-types";
import { activeChainId } from "../../utils/chainConfig";
import { useWeb3AuthContext } from "../SocialLoginContext/SocialLoginContext";
import { Balance, ISmartAccount, smartAccountContextType } from "../types";
import { initialState } from "./initialState";
import { smartAccountConfig } from "../../utils/smartAccountConfig";

export const SmartAccountContext = React.createContext<smartAccountContextType>(initialState);

// Provider
// TODO: Change to reducers anf actions
export const SmartAccountProvider = ({ children }: any) => {
  const { provider, address } = useWeb3AuthContext();

  // TODO: Move all state to initial state
  const [wallet, setWallet] = useState<SmartAccount | null>(null);
  const [state, setState] = useState<SmartAccountState | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<ISmartAccount | null>(null);
  const [smartAccountsArray, setSmartAccountsArray] = useState<ISmartAccount[]>([]);
  const [balance, setBalance] = useState<Balance>({
    totalBalanceInUsd: 0,
    alltokenBalances: []
  });
  const [isFetchingBalance, setIsFetchingBalance] = useState(false);

  const [loading, setLoading] = useState(false); // move loading to global state

  /**
   * Get smart account instance
   */
  const getSmartAccount = useCallback(async () => {
    if (!provider || !address) return "Wallet not connected";

    try {
      setLoading(true);
      const walletProvider = new ethers.providers.Web3Provider(provider);

      // New instance, all config params are optional
      const wallet = new SmartAccount(walletProvider, smartAccountConfig);

      // Wallet initialization to fetch wallet info
      const smartAccount = await wallet.init();
      setWallet(wallet);

      smartAccount.on("txHashGenerated", (response: any) => {
        console.log(`SA: Transaction sent: ${response.hash}`);
      });

      smartAccount.on("txHashChanged", (response: any) => {
        console.log(`SA: Transaction updated with hash: ${response.hash}`);
      });

      smartAccount.on("txMined", (response: any) => {
        console.log(`SA: Transaction confirmed: ${response.hash}`);
      });

      smartAccount.on("error", (response: any) => {});

      // get all smart account versions available and update in state
      const { data } = await smartAccount.getSmartAccountsByOwner({
        chainId: activeChainId,
        owner: address
      });

      const accountData = [];
      for (let i = 0; i < data.length; ++i) {
        accountData.push(data[i]);
      }
      setSmartAccountsArray(accountData);
      // set the first wallet version as default
      if (accountData.length) {
        wallet.setSmartAccountVersion(accountData[0].version as SmartAccountVersion);
        setSelectedAccount(accountData[0]);
      }

      // get address, isDeployed and other data
      const state = await smartAccount.getSmartAccountState();
      setState(state);

      setLoading(false);
      return "";
    } catch (error: any) {
      setLoading(false);
      return error.message;
    }
  }, [provider, address]);

  /**
   * Get smart account balance
   * @returns
   */
  const getSmartAccountBalance = async () => {
    if (!provider || !address) return "Wallet not connected";
    if (!state || !wallet) return "Init Smart Account First";

    try {
      setIsFetchingBalance(true);

      const balanceParams = {
        chainId: activeChainId,
        eoaAddress: state.address,
        tokenAddresses: []
      };

      const balFromSdk = await wallet.getAlltokenBalances(balanceParams);

      const usdBalFromSdk = await wallet.getTotalBalanceInUsd(balanceParams);
      setBalance({
        totalBalanceInUsd: usdBalFromSdk.data.totalBalance,
        alltokenBalances: balFromSdk.data
      });

      setIsFetchingBalance(false);
      return "";
    } catch (error: any) {
      setIsFetchingBalance(false);
      return error.message;
    }
  };

  /**
   * Set smart account version
   */
  useEffect(() => {
    if (wallet && selectedAccount) {
      wallet.setSmartAccountVersion(selectedAccount.version as SmartAccountVersion);
    }
  }, [selectedAccount]);

  /**
   * Get smart account on load
   */
  useEffect(() => {
    getSmartAccount();
  }, [getSmartAccount]);

  return (
    <SmartAccountContext.Provider
      value={{
        wallet,
        state,
        balance,
        loading,
        isFetchingBalance,
        selectedAccount,
        smartAccountsArray,
        setSelectedAccount,
        getSmartAccount,
        getSmartAccountBalance
      }}>
      {children}
    </SmartAccountContext.Provider>
  );
};

export const useSmartAccountContext = () => useContext(SmartAccountContext);

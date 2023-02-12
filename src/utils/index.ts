import { BigNumber, Wallet as EOAWallet } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";

export function ellipseAddress(address = "", width = 10): string {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export const getEOAWallet = (privateKey: string, provider: any) => {
  // defaults
  if (!provider) {
    // TODO
    // Fetch rpc url as per active chain id
    provider = "https://rpc.ankr.com/polygon_mumbai";
    // provider = ""
  }

  const wallet = new EOAWallet(privateKey);

  if (typeof provider === "string") {
    return wallet.connect(new JsonRpcProvider(provider));
  } else {
    return wallet.connect(provider);
  }
};

export const formatBalance = (value: string, decimals: number) => {
  const divideBy = BigNumber.from(10).pow(BigNumber.from(decimals));
  const balance = (parseFloat(value) / parseFloat(divideBy.toString())).toFixed(4);
  console.log(" formatBalance ", balance);
  // let res = ethers.utils.formatEther(balance);
  return balance.toString();
};

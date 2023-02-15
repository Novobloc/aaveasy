// import { BigNumber, Wallet as EOAWallet } from "ethers";
// import { JsonRpcProvider } from "@ethersproject/providers";

export function ellipseAddress(address = "", width = 10): string {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}



// export const formatBalance = (value: string, decimals: number) => {
//   const divideBy = BigNumber.from(10).pow(BigNumber.from(decimals));
//   const balance = (parseFloat(value) / parseFloat(divideBy.toString())).toFixed(4);
//   console.log(" formatBalance ", balance);
//   // let res = ethers.utils.formatEther(balance);
//   return balance.toString();
// };


export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

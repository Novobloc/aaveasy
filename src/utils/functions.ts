import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BigNumber, ethers } from "ethers";

export const getAllBalances = async (walletAddress: string) => {
  const data = JSON.stringify({
    jsonrpc: "2.0",
    method: "alchemy_getTokenBalances",
    params: [walletAddress],
    id: "1"
  });

  const config: AxiosRequestConfig = {
    method: "post",
    url: "https://polygon-mumbai.g.alchemy.com/v2/3jhc6GGw5LCvFa4HR12QFXoynv9THywA",
    headers: {
      "Content-Type": "application/json"
    },
    data: data
  };

  const response: AxiosResponse = await axios(config);
  const tokenBalances = response.data.result.tokenBalances;
  const promises = await tokenBalances.map(async (item: any) => {
    const val = await getTokenMetaData(item.contractAddress);
    const amount = item.tokenBalance / Math.pow(10, val.decimals);
    item.meta = val;
    item.amount = amount;
    item.meta.viewURL = `https://mumbai.polygonscan.com/address/${walletAddress}#tokentxns`;
    return item;
  });
  const tokenBalancesNew = await Promise.all(promises);
  return tokenBalancesNew;
};

export const getTokenMetaData = async (tokenAddress: string) => {
  const data = JSON.stringify({
    jsonrpc: "2.0",
    method: "alchemy_getTokenMetadata",
    params: [tokenAddress],
    id: "1"
  });

  const config: AxiosRequestConfig = {
    method: "post",
    url: "https://polygon-mumbai.g.alchemy.com/v2/3jhc6GGw5LCvFa4HR12QFXoynv9THywA",
    headers: {
      "Content-Type": "application/json"
    },
    data: data
  };

  const response: AxiosResponse = await axios(config);
  const tokenMetaData = response.data.result;
  if (!tokenMetaData.logo) tokenMetaData.logo = await getLogo(tokenMetaData.symbol);
  return tokenMetaData;
};

export const getLogo = async (tokenSymbol: string) => {
  const tokenConfig = [
    {
      symbol: "MATIC",
      imageUrl: "https://assets-stg.transak.com/images/cryptoCurrency/matic-network_small.png"
    },
    {
      symbol: "ETH",
      imageUrl: "https://assets-stg.transak.com/images/cryptoCurrency/ethereum_small.png"
    },
    {
      symbol: "DAI",
      imageUrl: "https://assets-stg.transak.com/images/cryptoCurrency/dai_small.png"
    },
    {
      symbol: "USDC",
      imageUrl: "https://assets-stg.transak.com/images/cryptoCurrency/usd-coin_small.png"
    }
  ];
  const logo = await tokenConfig.find((it) => tokenSymbol.includes(it.symbol))?.imageUrl;
  return logo;
};

export const withDrawBalance = async (smartAccount: any, contractAddress: string, recipient: string, amount: BigNumber) => {
  const erc20Interface = new ethers.utils.Interface(["function transfer(address _to, uint256 _value)"]);

  // Encode an ERC-20 token transfer to recipient of the specified amount
  const data = erc20Interface.encodeFunctionData("transfer", [recipient, amount]);

  const tx1 = {
    to: contractAddress, //APOLDAI
    data
  };

  // Transaction subscription

  smartAccount.on("txHashGenerated", (response: any) => {
    console.log("txHashGenerated event received via emitter", response);
  });

  smartAccount.on("txMined", (response: any) => {
    console.log("txMined event received via emitter", response);
  });

  smartAccount.on("error", (response: any) => {
    console.log("error event received via emitter", response);
  });

  // You will first receive fee quotes from the SDK to be able to display to the user
  const feeQuotes = await smartAccount.prepareRefundTransaction({ transaction: tx1 });
  console.log(feeQuotes, "feeQuotes");

  const transaction = await smartAccount.createRefundTransaction({
    transaction: tx1,
    feeQuote: feeQuotes[0] // say user chooses MATIC from above
  });

  const gasLimit = {
    hex: "0x1E8480",
    type: "hex"
  };

  const txId = await smartAccount.sendTransaction({
    tx: transaction, // temp
    gasLimit
  });
  console.log(txId, "txId");
  return txId;
};

export const aaveMarketInfo = async () => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: "https://aave-api-v2.aave.com/data/markets-data"
  };
  const response: AxiosResponse = await axios(config);
  const data = response?.data?.reserves;
  return data;
};

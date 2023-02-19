import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import _ from "lodash";

export const getAllBalances = async (walletAddress: string) => {
  if (walletAddress) {
    const data = JSON.stringify({
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      params: [walletAddress],
      id: "1"
    });

    const config: AxiosRequestConfig = {
      method: "post",
      url: "https://eth-goerli.g.alchemy.com/v2/F5zgnKQ6jSwgmSYQo-rXR5kPVKjRObqE",
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    };

    const response: AxiosResponse = await axios(config);
    const tokenBalances = response.data.result.tokenBalances;

    const promises = await tokenBalances.map(async (item: any) => {
      const metaData = await getTokenMetaData(item.contractAddress);
      if (metaData) {
        const amount = item.tokenBalance / Math.pow(10, metaData.decimals);

        item.meta = metaData;
        item.amount = amount.toFixed(2);
        item.meta.viewURL = `https://goerli.etherscan.io/address/${walletAddress}#tokentxns`;
      }
      return item;
    });

    const tokenBalancesNew = await Promise.all(promises);
    const d = _.remove(tokenBalancesNew, function (n) {
      return !n.meta || !n.amount;
    });
    let gfg = _.sortBy(tokenBalancesNew, [
      function (o) {
        return o.amount;
      }
    ]);
    return gfg.reverse();
  }
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
    url: "https://eth-goerli.g.alchemy.com/v2/F5zgnKQ6jSwgmSYQo-rXR5kPVKjRObqE",
    headers: {
      "Content-Type": "application/json"
    },
    data: data
  };

  const response: AxiosResponse = await axios(config);
  const tokenMetaData = response.data.result;
  return tokenMetaData;
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

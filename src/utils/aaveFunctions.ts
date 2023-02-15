import { Pool, EthereumTransactionTypeExtended } from "@aave/contract-helpers";
import { BigNumber, providers } from "ethers";

export const supply = async () => {
  // get metamask provider using ethers.js
  const provider = new providers.Web3Provider(window.ethereum);

  const pool = new Pool(provider, {
    POOL: "0x73D94B5D5C0a68Fe279a91b23D2165D2DAaA41d3",
    WETH_GATEWAY: "0x2A498323aCaD2971a8b1936fD7540596dC9BBacD"
  });

  const txs = await pool.supply({
    user: "0xDFB93485205a9b0bC9E6e06F60882C8eb82aBcfe",
    reserve: "0xCCB14936C2E000ED8393A571D15A2672537838Ad",
    amount: "0.1"
  });

  console.log("txs : ", txs);

  // If the user has not approved the pool contract to spend their tokens, txs will also contain two transactions: approve and supply. These approval and supply transactions can be submitted just as in V2,OR
  //   you can skip the first approval transaction with a gasless signature by using signERC20Approval -> supplyWithPermit which are documented below

  // If there is no approval transaction, then supply() can called without the need for an approval or signature

  submitTransaction(provider, txs);
};

// Signing transactions requires a wallet provider, Aave UI currently uses web3-react (https://github.com/NoahZinsmeister/web3-react) for connecting wallets and accessing the wallet provider

const submitTransaction = async (provider: any, txs: any) => {
  const extendedTxData = await txs[0].tx();
  const { from, ...txData } = extendedTxData;
  const signer = provider.getSigner();
  const txResponse = await signer.sendTransaction({
    ...txData,
    value: txData.value ? BigNumber.from(txData.value) : undefined
  });

  console.log("txResponse: ", txResponse);

  // call 2nd transaction if it exists
  const extendedTxData2 = await txs[1].tx();
  const { from2, ...txData2 } = extendedTxData2;
  const signer2 = provider.getSigner();
  const txResponse2 = await signer.sendTransaction({
    ...txData,
    value: txData2.value ? BigNumber.from(txData2.value) : undefined
  });


};

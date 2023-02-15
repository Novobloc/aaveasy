import { Pool, EthereumTransactionTypeExtended, ChainId } from "@aave/contract-helpers";
import { BigNumber, providers, ethers } from "ethers";

// Mumbai
// LENDING_POOL: '0xEce3383269ccE0B2ae66277101996b58c482817B',
// WETH_GATEWAY: '0x9BBA071d1f2A397Da82687e951bFC0407280E348',

// Goerli
// LENDING_POOL: "0x368EedF3f56ad10b9bC57eed4Dac65B26Bb667f6",
// WETH_GATEWAY: "0xd5B55D3Ed89FDa19124ceB5baB620328287b915d",

export const supply = async () => {
  // get metamask provider using ethers.js
  await window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const pool = new Pool(provider, {
    POOL: "0x368EedF3f56ad10b9bC57eed4Dac65B26Bb667f6"
    // WETH_GATEWAY: "0xd5B55D3Ed89FDa19124ceB5baB620328287b915d"
  });

  const txs = await pool.supply({
    user: "0x5B4d77e199FE8e5090009C72d2a5581C74FEbE89", // user wallet address
    reserve: "0x07C725d58437504CA5f814AE406e70E21C5e8e9e", //underlying asset address
    amount: "2"
  });

  console.log("txs : ", txs);

  // If the user has not approved the pool contract to spend their tokens, txs will also contain two transactions: approve and supply. These approval and supply transactions can be submitted just as in V2,OR
  //   you can skip the first approval transaction with a gasless signature by using signERC20Approval -> supplyWithPermit which are documented below

  // If there is no approval transaction, then supply() can called without the need for an approval or signature

  await submitTransaction(provider, txs);
};

const submitTransaction = async (provider: any, txs: any) => {
  const responseArray: any = [];
  if (txs.length > 0) {
    for (let index = 0; index < txs.length; index++) {
      console.log("Loop No: ", index);
      const extendedTxData = await txs[index].tx();
      const { from, ...txData } = extendedTxData;
      const signer = provider.getSigner(from);
      const txResponse = await signer.sendTransaction({
        ...txData,
        value: txData.value ? BigNumber.from(txData.value) : undefined,
        gasLimit: 10000000
      });
      await txResponse.wait();
      console.log("txResponse", txResponse);
      responseArray.push(txResponse);
    }
  }
  return responseArray;
};
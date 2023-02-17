import { Pool, EthereumTransactionTypeExtended, ChainId } from "@aave/contract-helpers";
import { BigNumber, providers, ethers } from "ethers";
import { sendTransaction } from "./arcadaFunctions";

// Mumbai
// LENDING_POOL: '0xEce3383269ccE0B2ae66277101996b58c482817B',
// WETH_GATEWAY: '0x9BBA071d1f2A397Da82687e951bFC0407280E348',

// Goerli
// LENDING_POOL: "0x368EedF3f56ad10b9bC57eed4Dac65B26Bb667f6",
// WETH_GATEWAY: "0xd5B55D3Ed89FDa19124ceB5baB620328287b915d",

export const supply = async (arcanaProvider: any) => {
  arcanaProvider.request({ method: "eth_accounts" }).then((accounts: any) => {
    console.log("accounts: ", accounts);
  });
  // console.log('provider: ', provider);

  const pool = new Pool(new ethers.providers.Web3Provider(arcanaProvider), {
    POOL: "0x368EedF3f56ad10b9bC57eed4Dac65B26Bb667f6"
    // WETH_GATEWAY: "0xd5B55D3Ed89FDa19124ceB5baB620328287b915d"
  });

  console.log("pool: ", pool);

  const txs = await pool.supply({
    user: "0x5B4d77e199FE8e5090009C72d2a5581C74FEbE89", // user wallet address
    reserve: "0x07C725d58437504CA5f814AE406e70E21C5e8e9e", //underlying asset address
    amount: "0.12"
  });

  console.log("txs : ", txs);

  await sendTransaction(arcanaProvider, txs);
};

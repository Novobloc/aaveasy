import { Pool, ChainId, InterestRate } from "@aave/contract-helpers";
import { ethers } from "ethers";
import { sendTransaction } from "./arcanaFunctions";

// https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
const GOERLI_LINK_ADDRESS = "0x07C725d58437504CA5f814AE406e70E21C5e8e9e";
const GOERLI_DAI_ADDRESS = "0xBa8DCeD3512925e52FE67b1b5329187589072A55"; // From AAVE
const GOERLI_USDC_ADDRESS = "0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43";

// 0x5a6Ba5e8e7091F64D4bb6729830E5EAf00Bb943d  AEURS

// Mumbai
// LENDING_POOL: '0xEce3383269ccE0B2ae66277101996b58c482817B',
// WETH_GATEWAY: '0x9BBA071d1f2A397Da82687e951bFC0407280E348',

// Goerli
// LENDING_POOL: "0x368EedF3f56ad10b9bC57eed4Dac65B26Bb667f6",
// WETH_GATEWAY: "0xd5B55D3Ed89FDa19124ceB5baB620328287b915d",

// get Pool
export const getPool = (arcanaProvider: any) => {
  return new Pool(new ethers.providers.Web3Provider(arcanaProvider), {
    POOL: "0x368EedF3f56ad10b9bC57eed4Dac65B26Bb667f6",
    WETH_GATEWAY: "0xd5B55D3Ed89FDa19124ceB5baB620328287b915d"
  });
};

export const supply = async (arcanaProvider: any, user: any, asset: any) => {
  const pool = getPool(arcanaProvider);
  const txs = await pool.supply({
    user: user.address, // "0xb21654C6A18D2d4446548a534b8E8e87BBEfA0EC", // user wallet address
    reserve: asset.underlyingAsset, //underlying asset address
    amount: "2"
  });

  const response = await sendTransaction(arcanaProvider, txs);
  return response;
};

export const withdraw = async (arcanaProvider: any, user: any, asset: any) => {
  const pool = getPool(arcanaProvider);
  const withdrawalAmount = (asset.currentATokenBalance / Math.pow(10, asset.reserve.decimals)).toString() || "1";
  const txs = await pool.withdraw({
    user: user?.address, // user wallet address
    reserve: asset.reserve.underlyingAsset, //underlying asset address
    amount: withdrawalAmount,
    aTokenAddress: asset.reserve.aToken.id, //aLINK
    onBehalfOf: user?.address
  });

  const response = await sendTransaction(arcanaProvider, txs);
  return response;
};

export const borrow = async (arcanaProvider: any, user: any, asset: any) => {
  try {
    const pool = getPool(arcanaProvider);
    const txs = await pool.borrow({
      user: user.address, // "0xb21654C6A18D2d4446548a534b8E8e87BBEfA0EC", // user wallet address
      reserve: asset.underlyingAsset, //underlying asset address
      amount: "10",
      interestRateMode: InterestRate.Stable,
      onBehalfOf: user.address
    });

    console.log("txs : ", txs);

    const response = await sendTransaction(arcanaProvider, txs);
    return response;
  } catch (error) {
    console.log(error, "errro");
  }
};

export const repay = async (arcanaProvider: any, user: any, asset: any) => {
  const pool = getPool(arcanaProvider);
  const txs = await pool.repay({
    user: user.address, // "0xb21654C6A18D2d4446548a534b8E8e87BBEfA0EC", // user wallet address
    reserve: asset.userReserve.reserve.underlyingAsset, //underlying asset address
    amount: asset.currentStableDebt || "1",
    interestRateMode: InterestRate.Stable,
    onBehalfOf: user.address
  });

  const response = await sendTransaction(arcanaProvider, txs);
  return response;
};

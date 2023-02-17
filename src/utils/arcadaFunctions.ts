// Arcana functions

import { BigNumber, providers, ethers } from "ethers";

// const signTransaction = async (provider:any) => {

//   const { sig } = await provider.request({
//     method: 'eth_signTransaction',
//     params: [
//       {
//         from, // sender account address
//         gasPrice: 0,
//         to: '0xE28F01Cf69f27Ee17e552bFDFB7ff301ca07e780', // receiver account address
//         value: '0x0de0b6b3a7640000',
//       },
//     ],
//   })
//   console.log({ sig })
// }

export const sendTransaction = async (arcanaProvider: any, txs: any) => {
  const provider = new ethers.providers.Web3Provider(arcanaProvider);

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

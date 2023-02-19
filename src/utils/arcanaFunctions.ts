// Arcana functions

import { BigNumber, ethers } from "ethers";

export const sendTransaction = async (arcanaProvider: any, txs: any) => {
  const provider = new ethers.providers.Web3Provider(arcanaProvider);

  const responseArray: any = [];
  if (txs.length > 0) {
    for (let index = 0; index < txs.length; index++) {
      console.log("Loop No: ", index);
      const extendedTxData = await txs[index].tx();
      console.log(extendedTxData, "hi");

      const { from, ...txData } = extendedTxData;
      console.log(from, "from");

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

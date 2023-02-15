import transakSDK from "@transak/transak-sdk";

export const launchTransak = (params) => {

  console.log("launching transak");
  let transak = new transakSDK(params);

  return transak;
};
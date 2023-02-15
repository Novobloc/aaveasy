import transakSDK from "@transak/transak-sdk";

export const launchTransak = (params) => {
  const { apiKey, environment, defaultCryptoCurrency, walletAddress, fiatCurrency, partnerOrderId, email } = params;

  console.log("launching transak");
  let transak = new transakSDK({
    widgetHeight: "750px",
    widgetWidth: "450px",
    fiatCurrency, // If you want to limit fiat selection eg 'GBP'
    apiKey, // Your API Key
    environment, // STAGING/PRODUCTION
    defaultCryptoCurrency,
    email,
    walletAddress,
    partnerOrderId,
    disableWalletAddressForm: true,
    // Need to add transakone params and other needed params
  });

  return transak;
};
// Arcana functions

export const sendTransaction = async (provider: any) => {
  // setRequest('eth_sendTransaction')
  const hash = await provider.request({
    method: "eth_sendTransaction",
    params: [
      {
        gasPrice: 0,
        to: "0xE28F01Cf69f27Ee17e552bFDFB7ff301ca07e780",
        value: "0x0de0b6b3a7640000"
      }
    ]
  });
  console.log({ hash });
};

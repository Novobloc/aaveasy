import { supportedChains, activeChainId, ChainId } from "./chainConfig";

export const smartAccountConfig = {
  activeNetworkId: activeChainId,
  supportedNetworksIds: supportedChains,
  networkConfig: [
    {
      chainId: ChainId.GOERLI,
      dappAPIKey: "59fRCMXvk.8a1652f0-b522-4ea7-b296-98628499aee3",
      // if need to override // providerUrl:
    },
    {
      chainId: ChainId.POLYGON_MAINNET,
      // dappAPIKey: todo
    },
  ],
};

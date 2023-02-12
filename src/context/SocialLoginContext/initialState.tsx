import { activeChainId } from "../../utils/chainConfig";
import { StateType } from "../types";

// ?? why 2 states?
export const w3state: StateType = {
  provider: null,
  web3Provider: null,
  ethersProvider: null,
  address: "",
  chainId: activeChainId,
};

export const initialState: any = {
  connect: () => Promise.resolve(null),
  disconnect: () => Promise.resolve(),
  loading: false,
  provider: null,
  ethersProvider: null,
  web3Provider: null,
  chainId: activeChainId,
  address: "",
};

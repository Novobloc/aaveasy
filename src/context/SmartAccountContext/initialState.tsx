// Context

export const initialState = {
  wallet: null,
  state: null,
  balance: {
    totalBalanceInUsd: 0,
    alltokenBalances: [],
  },
  loading: false,
  isFetchingBalance: false,
  selectedAccount: null,
  smartAccountsArray: [],
  setSelectedAccount: () => {},
  getSmartAccount: () => Promise.resolve(""),
  getSmartAccountBalance: () => Promise.resolve(""),
};

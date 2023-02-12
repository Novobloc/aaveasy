import { initialStateContext } from "../types";

export const initialState: initialStateContext = {
  transakOrderData: null,
  queryParams: null,
  appLoading: false,
  accounts: null,
  version: "1.0.0",
  setQueryParams: () => {},
  setAppLoading: () => {},
  setTransakOrderData: () => {}
};

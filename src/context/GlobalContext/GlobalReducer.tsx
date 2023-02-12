import { IQueryParams } from "../types";


export const GlobalReducer = (state: any, action: { type: any; payload: IQueryParams | Boolean; }) => {
  switch (action.type) {
    case "SET_TRANSAK_ORDER_DATA":
      return {
        ...state,
        transakOrderData: action.payload,
      };

    case "SET_QUERY_PARAMS":
      return {
        ...state,
        queryParams: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        appLoading: action.payload,
      };

    default:
      return state;
  }
};

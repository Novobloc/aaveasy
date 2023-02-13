import { ethers } from "ethers";

//  Global Context
export type IQueryParams = {
  apiKey: string | null;
  symbol: string | null;
  network: string | null;
  contractAddress: string | null;
  contractFunction: string | null;
  contractParams: string | null;
  widgetTitle: string | null;
  buttonName: string | null;
  extraDetails: string;
  partnerOrderId: string | null;
};

export type initialStateContext = {
  transakOrderData: any;
  queryParams: null;
  appLoading: boolean;
  accounts: any;
  version: string;
  setQueryParams: React.Dispatch<IQueryParams | null>;
  setAppLoading: React.Dispatch<Boolean>;
  setTransakOrderData: React.Dispatch<Boolean>;
};

// Smart account context
// Types
export type Balance = {
  totalBalanceInUsd: number;
  alltokenBalances: any[];
};

export type ISmartAccount = {
  version: string;
  smartAccountAddress: string;
  isDeployed: boolean;
};




export enum SignTypeMethod {
  PERSONAL_SIGN = "PERSONAL_SIGN",
  EIP712_SIGN = "EIP712_SIGN"
}

export type StateType = {
  provider?: any;
  web3Provider?: ethers.providers.Web3Provider | null;
  ethersProvider?: ethers.providers.Web3Provider | null;
  address?: string;
  chainId?: number;
  userInfo?: any;
};

export type UserInfoType = {
  email: string; //"sandeep@transak.com"
  name: string; //"Sandeep Kumar"
  profileImage: string; //"https://lh3.googleusercontent.com/a/AEdFTp6VEluRiK9Kva1NAEpwvsUmK-NEjXkBzAcJZLwt=s96-c",
  aggregateVerifier: string; //"tkey-google-lrc",
  verifier: string; //"torus",
  verifierId: string; //"sandeep@transak.com",
  typeOfLogin: string; //"google",
  dappShare: string; //"",
  idToken: string; //"eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRZT2dnXy01RU9FYmxhWS1WVlJZcVZhREFncHRuZktWNDUzNU1aUEMwdzAifQ.eyJpYXQiOjE2NzI0NzY3NjEsImF1ZCI6IkJEdHhsbUNYTkFXUUZHaWlhaVZZM1FiMWFOLWQ3RFE4Mk9oVDZCLVJCcjVqX3JHbnJLQXFiSWt2TEpsZi1vZllsSlJpTlNIYm5rZUhsc2g4ajN1ZXVZWSIsIm5vbmNlIjoiMDIzYzkwNDhhZjU5YjBhZGQzMDhjYjM5NGNkODdhMmYyNzUwNjNhOWRjMTAzYjJhYTkwZGUyMjgwOWVmNTEyY2UxIiwiaXNzIjoiaHR0cHM6Ly9hcGkub3BlbmxvZ2luLmNvbSIsIndhbGxldHMiOlt7InB1YmxpY19rZXkiOiIwMjliOGQyZGU4YjJlNTAwYTAyYWI1NjQ4YTAyYjlkMmQxODE4NjE2ODRlYzU2MWZiYmNkY2MzNDQwYTU1MWEwNmYiLCJ0eXBlIjoid2ViM2F1dGhfYXBwX2tleSIsImN1cnZlIjoic2VjcDI1NmsxIn1dLCJlbWFpbCI6InNhbmRlZXBAdHJhbnNhay5jb20iLCJuYW1lIjoiU2FuZGVlcCBLdW1hciIsInByb2ZpbGVJbWFnZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDZWRWx1UmlLOUt2YTFOQUVwd3ZzVW1LLU5FalhrQnpBY0paTHd0PXM5Ni1jIiwidmVyaWZpZXIiOiJ0b3J1cyIsInZlcmlmaWVySWQiOiJzYW5kZWVwQHRyYW5zYWsuY29tIiwiYWdncmVnYXRlVmVyaWZpZXIiOiJ0a2V5LWdvb2dsZS1scmMiLCJleHAiOjE2NzI1NjMxNjF9.ov9C9-ZR2RsfcnIpPNdFEwpSkrDi91qYPJ8cf6xx9q-e1bQqbK21MRjX1tyC1aHuV7FHIgcQh0hQO-Cs1Q_pQg",
  oAuthIdToken: string; //"",
  oAuthAccessToken: string; //""
};

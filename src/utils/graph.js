import { createClient } from "urql";
import { fetchUserTransactionsQuery, fetchUserReservesQuery, fetchUserQuery, fetchBorrowsQuery, fetchOnlyUserReservesQuery, fetchUserBorrowsQuery, fetchUserSuppliesQuery } from "./graphQueries";

const config = {
  GRAPH_PROTOCOL: {
    SUB_GRAPH_ID: "QmY2rg3CTVbLafhfyiYxkEGt4SWrhASqzu7qJ6yu9ucMqg",
    API_URL: "https://api.thegraph.com/subgraphs/name/aave/protocol-v3-goerli"
  }
};

const API_URL = config.GRAPH_PROTOCOL.API_URL;

export const getUserTransactions = async (address) => {
  const query = fetchUserTransactionsQuery(address);
  const client = createClient({
    url: API_URL
  });
  const response = await client.query(query).toPromise();
  return response.data;
};

export const getUserReserves = async (address) => {
  const query = fetchUserReservesQuery(address);
  const client = createClient({
    url: API_URL
  });
  const response = await client.query(query).toPromise();
  return response.data;
};

export const getUserBalance = async (address) => {
  const query = fetchUserQuery(address);
  const client = createClient({
    url: API_URL
  });
  const response = await client.query(query).toPromise();
  return response.data;
};

export const getBorrowHistory = async (address) => {
  const query = fetchBorrowsQuery(address);
  const client = createClient({
    url: API_URL
  });
  const response = await client.query(query).toPromise();
  return response.data;
};


export const getOnlyUserReserves = async (address) => {
  const query = fetchOnlyUserReservesQuery(address);
  const client = createClient({
    url: API_URL
  });
  const response = await client.query(query).toPromise();
  return response.data;
};

export const getUserBorrows = async (address) => {
  const query = fetchUserBorrowsQuery(address);
  const client = createClient({
    url: API_URL
  });
  const response = await client.query(query).toPromise();
  return response.data;
};


export const getUserSupplies = async (address) => {
  const query = fetchUserSuppliesQuery(address);
  const client = createClient({
    url: API_URL
  });
  const response = await client.query(query).toPromise();
  return response.data;
};
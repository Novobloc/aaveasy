import { createClient } from "urql";
import { fetchUserTransactionsQuery, fetchUserReservesQuery, fetchUserQuery } from "./graphQueries";

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
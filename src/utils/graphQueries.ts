export const fetchUserTransactionsQuery = (address: string) => {
  const query = `
      query {
        userTransactions(
          where: { user: ${JSON.stringify(address)} }
          orderBy: timestamp
          orderDirection: desc
        ) {
          id
          timestamp
          txHash
          action
          ... on Supply {
            amount
            reserve {
              symbol
              decimals
              underlyingAsset
            }
            assetPriceUSD
          }
          ... on Borrow {
            amount
            borrowRateMode
            borrowRate
            stableTokenDebt
            variableTokenDebt
            reserve {
              symbol
              decimals
              underlyingAsset
            }
            assetPriceUSD
          }
          ... on Repay {
            amount
            reserve {
              symbol
              decimals
              underlyingAsset
            }
            assetPriceUSD
          }
        }
      }
    `;

  return query;
};

export const fetchUserReservesQuery = (address: string) => {
  const query = `
  {
    userReserves(
      orderBy: id
      where: {user:${JSON.stringify(address)} }
    ) {
      currentATokenBalance
      currentStableDebt
      id
      supplyHistory(orderBy: id) {
        amount
        assetPriceUSD
        action
        id
        txHash
        timestamp
         reserve {
          symbol
        }
        userReserve {
          currentATokenBalance
        }
      }
      borrowHistory {
        action
        amount
        assetPriceUSD
        reserve {
          symbol
        }
        timestamp
        txHash
      }
      repayHistory {
         action
        amount
        assetPriceUSD
        reserve {
          symbol
        }
        timestamp
        txHash
      }
      currentATokenBalance
    reserve {
      aToken {
        underlyingAssetAddress
        underlyingAssetDecimals
      }
      decimals
      name
      totalATokenSupply
      totalSupplies
      underlyingAsset
    }
    currentTotalDebt
    currentStableDebt
    }
  }`;
  return query;
};

export const fetchUserQuery = (address: string) => {
  const query = `
  {
    users(where: {id: ${JSON.stringify(address)}}) {
      id
      reserves(orderBy: id) {
        currentATokenBalance
        reserve {
          decimals
          name
          symbol
          totalSupplies
          underlyingAsset
          aToken {
            underlyingAssetAddress
          }
        }
      }
    }
  }`;
  return query;
};

export const fetchBorrowsQuery = (address: string) => {
  const query = `
  {
    borrows(where: {user: ${JSON.stringify(address)}}) {
      amount
      action
      assetPriceUSD
      borrowRate
      borrowRateMode
      id
      stableTokenDebt
      timestamp
      txHash
      variableTokenDebt
      reserve {
        decimals
        name
        symbol
        id
        availableLiquidity
        aToken {
          id
          underlyingAssetAddress
          underlyingAssetDecimals
     
        }
      }
    }
  }
  `;
  return query;
};

export const fetchOnlyUserReservesQuery = (address: string) => {
  const query = `
  {
    user(id: ${JSON.stringify(address)}) {
      reserves {
        currentATokenBalance
        reserve {
          name
          underlyingAsset
          decimals
          symbol
          isActive
          id
        }
        id
        aTokenBalanceHistory {
          currentATokenBalance
          id
          scaledATokenBalance
        }
        supplyHistory {
          amount
          assetPriceUSD
          action
          txHash
          id
        }
      }
    }
  }
  `;
  return query;
};

export const fetchUserBorrowsQuery = (address: string) => {
  const query = `
  {
      borrows(where: {user_: {id: ${JSON.stringify(address)}}}) {
        id
        action
        amount
        assetPriceUSD
        txHash
        userReserve {
          currentATokenBalance
          reserve {
            decimals
            name
            borrowingEnabled
            isActive
            symbol
          }
        }
      }
  }`;
  return query;
};

export const fetchUserSuppliesQuery = (address: string) => {
  const query = `
 
{
  supplies(
    where: {user: ${JSON.stringify(address)}}
    orderBy: timestamp
  ) {
    amount
    assetPriceUSD
    txHash
    action
    timestamp
    userReserve {
      currentATokenBalance
    }
    reserve {
      decimals
      symbol
      name
    }
  }
}`;
  return query;
};

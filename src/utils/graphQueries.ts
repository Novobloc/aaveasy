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


// fetch all reserves
export const fetchReservesQuery = () => {
  const query = `{
    reserves {
      id
      symbol
      name
      decimals
      underlyingAsset
      usageAsCollateralEnabled
      reserveFactor
      baseLTVasCollateral
      averageStableRate
      stableDebtLastUpdateTimestamp
      liquidityIndex
      reserveLiquidationThreshold
      reserveLiquidationBonus
      variableBorrowIndex
      variableBorrowRate
      liquidityRate
      totalPrincipalStableDebt
      totalScaledVariableDebt
      lastUpdateTimestamp
      availableLiquidity
      stableBorrowRate
      totalLiquidity
      price {
        priceInEth
      }
    }
  }`;
  return query;
}
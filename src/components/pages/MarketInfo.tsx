import React, { useEffect, useState } from "react";
import { aaveMarketInfo } from "../../utils/functions";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { useAuth } from "@arcana/auth-react";
import { supply, borrow } from "../../utils/aaveFunctions";

const initialAssetList = [
  {
    underlyingAsset: "0x6b175474e89094c44da98b954eedeac495271d0f",
    symbol: "DAI",
    isActive: true,
    isFreezed: true,
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    variableBorrowRate: "0.01539236568068016961",
    stableBorrowRate: "0.03962202772629728824",
    liquidityRate: "0.00363689010342812663",
    totalLiquidity: "4160898.627476978410366572",
    lastUpdateTimestamp: 1676283659,
    aTokenAddress: "0xfc1e690f61efd961294b3e1ce3313fbd8aa4f85d",
    totalBorrows: "256423.850966812344867115",
    id: "0x6b175474e89094c44da98b954eedeac495271d0f0x24a42fd28c976a61df5d00d0599c34c4f90748c8",
    totalLiquidityUSD: "4175179.49387229818234328727",
    totalBorrowsUSD: "257303.93843927521415157394",
    interestPerSecond: "0.00417517949435380071"
  }
];

export default function MarketInfo() {
  const [assetList, setAssetList] = useState(initialAssetList);
  const { loading, isLoggedIn, provider } = useAuth();

  useEffect(() => {
    (async () => {
      const data = await aaveMarketInfo();
      setAssetList(data);
    })();
  }, []);

  const handleSupply = async (asset: any) => {
    supply(provider);
  };

  return (
    <>
      <section aria-labelledby="billing-history-heading">
        <div className="bg-white pt-6 shadow sm:overflow-hidden sm:rounded-md">
          <div className="px-4 sm:px-6">
            <h2 id="billing-history-heading" className="leading-6 text-xl font-semibold text-gray-900">
              Market Info
            </h2>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-my-2  sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border-t border-gray-200">
                  <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="sticky top-0 px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Asset
                        </th>
                        <th scope="col" className="sticky top-0 px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          isActive
                        </th>
                        <th scope="col" className="sticky top-0 px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          APY
                        </th>
                        <th scope="col" className="sticky top-0 px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          totalBorrowsUSD
                        </th>
                        <th scope="col" className="sticky top-0 px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Action
                        </th>
                        <th scope="col" className="relative px-6 py-3 text-left text-sm font-medium text-gray-500">
                          <span className="sr-only">View receipt</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {assetList
                        // .filter((item) => item.borrowingEnabled === true)
                        .map((asset: any) => (
                          <tr key={asset.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img className="h-10 w-10 rounded-full" src={asset.logo} alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">{asset.symbol}</div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{asset.isActive ? "YES" : "NO"}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{Number(asset.interestPerSecond).toFixed(4)}%</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{Number(asset.totalBorrowsUSD).toFixed(2)} USD</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              <a href={asset.explorerLink} className="text-orange-600 hover:text-orange-900">
                                Buy / Sell
                              </a>
                              &nbsp; &nbsp; &nbsp; &nbsp;
                              <button className="text-orange-600 hover:text-orange-900" onClick={handleSupply}>
                                Supply
                              </button>
                              &nbsp; &nbsp; &nbsp; &nbsp;
                              {asset.borrowingEnabled && (
                                <button className="text-orange-600 hover:text-orange-900" onClick={borrow}>
                                  Borrow
                                </button>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                              <a href={`https://mumbai.polygonscan.com/address/${asset.underlyingAsset}`} target="_blank" rel="noreferrer">
                                <ArrowTopRightOnSquareIcon />
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { aaveMarketInfo } from "../../utils/functions";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { useAuth } from "@arcana/auth-react";
import { supply, borrow } from "../../utils/aaveFunctions";
import { getAllReserves } from "../../utils/graph";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

export default function MarketInfo() {
  const [assetList, setAssetList] = useState([]);
  const { user, provider } = useAuth();

  useEffect(() => {
    (async () => {
      const reserveData = await getAllReserves();
      const reserves = reserveData.reserves;
      setAssetList(reserves);
    })();
  }, []);

  const handleSupply = async (asset: any) => {
    supply(provider, user);
  };

  const handleBorrow = async (asset: any) => {
    borrow(provider, user);
  };

  const randColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );
  };

  return (
    <>
      <section aria-labelledby="billing-history-heading">
        <div className="bg-white pt-6 shadow sm:overflow-hidden sm:rounded-md">
          <div className="flex px-4 sm:px-6">
            <h2 id="billing-history-heading" className="leading-6 text-xl font-semibold text-gray-900">
              Market Info
            </h2>

            <ArrowPathIcon className="h-6 w-6 ml-2 text-orange-500" />
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
                          Reserve Factor
                        </th>
                        <th scope="col" className="sticky top-0 px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Price
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
                      {assetList &&
                        assetList.length > 0 &&
                        assetList.map((asset: any) => (
                          <tr key={asset.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <button className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-200   to-fuchsia-200"></button>
                                  {/* <img className="h-10 w-10 rounded-full" src={asset.logo} alt="" /> */}
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">{asset.symbol}</div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{asset.isActive ? "YES" : "NO"}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{Number(asset.reserveFactor)}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{asset?.supplies[0].assetPriceUSD} $</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              <a href={asset.underlyingAsset} className="text-orange-600 hover:text-orange-900">
                                Buy / Sell
                              </a>
                              &nbsp; &nbsp; &nbsp; &nbsp;
                              <button className="text-orange-600 hover:text-orange-900" onClick={handleSupply}>
                                Supply
                              </button>
                              &nbsp; &nbsp; &nbsp; &nbsp;
                              {asset.borrowingEnabled && (
                                <button className="text-orange-600 hover:text-orange-900" onClick={handleBorrow}>
                                  Borrow
                                </button>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                              <a href={`https://goerli.etherscan.io/address/${asset.underlyingAsset}`} target="_blank" rel="noreferrer">
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

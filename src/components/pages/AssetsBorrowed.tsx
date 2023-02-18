import React, { useEffect, useState } from "react";
import { useAuth } from "@arcana/auth-react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { repay } from "../../utils/aaveFunctions";
import { getUserBorrows } from "../../utils/graph";

export default function AssetsToSupply() {
  const [assetList, setAssetList] = useState([]);
  const { user, provider }: any = useAuth();

  useEffect(() => {
    (async () => {
      const borrowData = await getUserBorrows(user?.address); //0x5b4d77e199fe8e5090009c72d2a5581c74febe89
      const borrowHistory = (borrowData && borrowData?.borrows) || [];
      setAssetList(borrowHistory);
    })();
  }, [user?.address]);

  const handleRepay = async (asset: any) => {
    repay(provider, user);
  };

  return (
    <>
      <section aria-labelledby="billing-history-heading">
        <div className="bg-white pt-6 shadow sm:overflow-hidden sm:rounded-md">
          <div className="px-4 sm:px-6">
            <h2 id="billing-history-heading" className="leading-6 text-xl font-normal text-gray-900">
              Borrowed Assets
            </h2>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border-t border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Symbol
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Balance
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          USD
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Action
                        </th>
                        <th scope="col" className="relative px-6 py-3 text-left text-sm font-medium text-gray-500">
                          <span className="sr-only">View receipt</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {assetList &&
                        assetList.length > 0 &&
                        assetList.map((asset: any) => (
                          <tr key={asset.id}>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{asset.userReserve.reserve.symbol}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {asset.amount / Math.pow(10, asset.userReserve.reserve.decimals)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {(asset.amount / Math.pow(10, asset.userReserve.reserve.decimals)) * asset.assetPriceUSD} $
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              <button className="text-orange-600 hover:text-orange-900" onClick={handleRepay}>
                                Repay
                              </button>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                              <a className="text-orange-600 hover:text-orange-900">
                                <ArrowRightIcon />
                              </a>
                            </td>
                          </tr>
                        ))}
                      {assetList && assetList.length === 0 && (
                        <tr className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 text-center w-full ">No Records Found</tr>
                      )}
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

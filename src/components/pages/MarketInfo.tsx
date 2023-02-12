import React from "react";

const payments = [
  {
    id: 1,
    date: "1/1/2020",
    datetime: "2020-01-01",
    description: "Business Plan - Annual Billing",
    amount: "CA$109.00",
    href: "#"
  }
];

const assetList = [
  {
    id: 1,
    symbol: "USDC",
    balance: "34.1233",
    isBuySell: true,
    isBorrow: true,
    isSupply: true,
    explorerLink: "",
    logo: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    APY: 2.3
  },
  {
    id: 1,
    symbol: "BTC",
    balance: "1.67",
    isBuySell: true,
    isBorrow: false,
    isSupply: true,
    explorerLink: "",
    logo: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
    APY: 1.7
  }
];

export default function Example() {
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
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border-t border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Asset
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Balance
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          APY
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
                      {assetList.map((asset) => (
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
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{asset.balance}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{asset.APY}%</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            {asset.isBuySell && (
                              <a href={asset.explorerLink} className="text-orange-600 hover:text-orange-900">
                                Buy / Sell
                              </a>
                            )}{" "}
                            {""}
                            {""}
                            {asset.isSupply && (
                              <a href={asset.explorerLink} className="text-orange-600 hover:text-orange-900">
                                Supply
                              </a>
                            )}{" "}
                            {""}
                            {""}
                            {asset.isBorrow && (
                              <a href={asset.explorerLink} className="text-orange-600 hover:text-orange-900">
                                Borrow
                              </a>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <a href={asset.explorerLink} className="text-orange-600 hover:text-orange-900">
                              View
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

import React, { useEffect, useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { useAuth } from "@arcana/auth-react";
import { getAllBalances } from "../../utils/functions";

export default function UserAllBalances() {
  const { user }: any = useAuth();
  const [userBalance, setUserBalance] = useState([]);

  useEffect(() => {
    (async () => {
      console.log(user?.address, "user?.address");
      const balanceData: any = await getAllBalances(user?.address);
      setUserBalance(balanceData);
    })();
  }, [user?.address]);

  return (
    <div className="app-container app-theme-white flex flex-col w-full text-gray-700 bg-white">
      <section className="px-2 py-0 md:px-0">
        <div className="container items-center max-w-7xl px-4 mx-auto xl:px-3">
          <div className="h-full">
            <div className="mx-auto max-w-7xl pb-10 lg:py-6 lg:px-8">
              <div className="px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">All Tokens</h1>
                    {/* <p className="mt-2 text-sm text-gray-700">A table of placeholder stock market data that does not make any sense.</p> */}
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                      type="button"
                      className="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Export
                    </button>
                  </div>
                </div>
                <div className="mt-8 flow-root">
                  <div className="-my-4 -mx-6 overflow-x-auto lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th scope="col" className="whitespace-nowrap  py-3.5 pl-6 pr-3  text-left text-sm font-semibold text-gray-900 sm:pl-0">
                              Symbol
                            </th>
                            <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Balance
                            </th>
                            <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                              View
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {userBalance &&
                            userBalance.length > 0 &&
                            userBalance.map((transaction: any, i) => (
                              <tr key={transaction.id}>
                                <td className="whitespace-nowrap py-3.5 pl-6 text-sm text-gray-500 sm:pl-0">{transaction?.meta?.symbol || ""}</td>
                                <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">{transaction.amount || ""}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                  <a href={transaction.meta.viewURL || ""} target="_blank" rel="noreferrer">
                                    <ArrowTopRightOnSquareIcon width={15} />
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
          </div>
        </div>
      </section>
    </div>
  );
}

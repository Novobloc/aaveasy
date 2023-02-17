import React, { useEffect, useState } from "react";
import { getUserBalance } from "../../utils/graph";
import { useAuth } from "@arcana/auth-react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

export default function Balance() {
  const { user }: any = useAuth();
  const [userBalance, setUserBalance] = useState([]);

  useEffect(() => {
    (async () => {
      console.log(user?.address, "user?.address");
      const balanceData = await getUserBalance("0x5b4d77e199fe8e5090009c72d2a5581c74febe89");
      const balance = balanceData?.users[0].reserves;
      console.log(balance, "balance");
      setUserBalance(balance);
    })();
  }, [user?.address]);

  return (
    <div>
      <h2 className="leading-6 text-xl font-semibold text-gray-900  lg:-mx-2">Balance</h2>
      <div className="mt-4 flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle ">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
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
                    userBalance.map((transaction: any) => (
                      <tr key={transaction.symbol}>
                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">{transaction.reserve.symbol}</td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                          {(Number(transaction.currentATokenBalance) / Math.pow(10, transaction.reserve.decimals)).toFixed(1)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <a href={`https://goerli.etherscan.io/address/${transaction.reserve.underlyingAsset}`} target="_blank" rel="noreferrer">
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
  );
}

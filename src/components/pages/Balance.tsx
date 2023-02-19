import React, { useEffect, useState } from "react";
import { getUserReserves } from "../../utils/graph";
import { useAuth } from "@arcana/auth-react";
import { ArrowTopRightOnSquareIcon, CheckIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { getAllBalances } from "../../utils/functions";
import { Link, useNavigate } from "react-router-dom";

export default function Balance() {
  const { user }: any = useAuth();
  const [userBalance, setUserBalance] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      console.log(user?.address, "user?.address");
      const balanceData: any = await getAllBalances(user?.address);
      console.log(balanceData, "balanceData");
      setUserBalance(balanceData);
    })();
  }, [user?.address]);

  const goToBalances = () => {
    return navigate("/user/balances");
  };

  return (
    <div>
      <div>
        <h2 className="leading-6 text-xl font-semibold text-gray-900 font-sans  lg:-mx-2">Balance</h2>
        <div className="bg-gray-50 px-4 text-right sm:px-6 -my-4">
          <button type="submit" className="uppercase inline-flex text-orange-600 hover:text-orange-900" onClick={goToBalances}>
            {" "}
            View All
            <ArrowRightIcon className="h-5 w-5 ml-2" aria-hidden="true" />
          </button>
        </div>
      </div>

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
                    userBalance.length > 0 &&
                    userBalance.slice(0, 2).map((transaction: any, i) => (
                      <tr key={i}>
                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">{transaction?.meta?.symbol || ""}</td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">{transaction.amount || ""}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <a href={transaction.meta.viewURL || ""} target="_blank" rel="noreferrer">
                            <ArrowTopRightOnSquareIcon width={15} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  {userBalance && userBalance.length === 0 && (
                    <tr className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 text-center w-full ">No Records Found</tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

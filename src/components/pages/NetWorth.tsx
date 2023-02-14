import React from "react";
import { CurrencyDollarIcon, ArrowRightIcon, PaperAirplaneIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";

const project = { name: "Net worth", amount: "240.57", href: "#", currency: "USD", bgColor: "bg-pink-600", icon: CurrencyDollarIcon };

export default function Example() {
  return (
    <div>
      <h2 className="leading-6 text-xl font-semibold text-gray-900 lg:-mx-2">Net Worth</h2>
      <ul role="list" className="mt-3 ">
        <li className="col-span-1 flex rounded-md shadow-sm">
          <CurrencyDollarIcon className="h-16 w-16 " aria-hidden="true" />
          <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
            <div className="flex-1 truncate px-4 py-2 text-sm">
              <a href={project.href} className="font-medium text-gray-900 hover:text-gray-600">
                {project.name}
              </a>
              <p className="text-gray-500">
                {project.amount} {project.currency}
              </p>
            </div>
            <div className="flex-shrink-0 pr-2">
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="sr-only">Open options</span>
                <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </li>
        <li className="col-span-1 flex rounded-md shadow-sm mt-5">
          <button
            type="button"
            className="mr-7 ml-7 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <ArrowDownIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Buy Crypto
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            <ArrowUpIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Sell Crypto
          </button>
        </li>
      </ul>
    </div>
  );
}

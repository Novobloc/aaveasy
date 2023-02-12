import React from "react";
import { CurrencyDollarIcon, BanknotesIcon, CreditCardIcon } from "@heroicons/react/24/outline";

const stats = [
  { name: "Supply Balance", icon: CreditCardIcon, amount: "2.76", currency: "LINK" },
  { name: "Borrow Balance", icon: BanknotesIcon, amount: "5.34", currency: "LINK" },
  { name: "Net worth", icon: CurrencyDollarIcon, amount: "240.57", currency: "USD" }
];

export default function Example() {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">Portfolio</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {item.amount}
                <span className="ml-2 text-sm font-medium text-gray-600"> {item.currency}</span>
              </p>

              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Know More
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

import React from "react";
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";

const project = { name: "Net worth", amount: "240.57", href: "#", currency: "USD", bgColor: "bg-pink-600", icon: CurrencyDollarIcon };

export default function Example() {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-500">Pinned Projects</h2>
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
            {/* <div className="flex-shrink-0 pr-2">
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div> */}
          </div>
        </li>
      </ul>
    </div>
  );
}

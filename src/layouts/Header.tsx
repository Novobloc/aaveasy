import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { ellipseAddress } from "../utils";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ArrowTopRightOnSquareIcon, ArrowLeftOnRectangleIcon, Square2StackIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const paths = [
  {
    path: "/app",
    name: "App"
  }
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {

  const selectedAccount = { smartAccountAddress: "0x1234567890" };
  const disconnectWallet = () => {};

  return (
    <section className="w-full px-8 text-gray-700 bg-white">
      <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <div className="relative flex flex-col md:flex-row">
          <Link to="/" className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
            <span className="mx-auto ml-0 text-xl  leading-none text-transparent bg-clip-text bg-gradient-to-r from-aave-500  to-aave-800 select-none">
              Aaveasy
            </span>

            {/* <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-aave-500  to-aave-800 lg:inline ">Aaveasy</span> */}
          </Link>
          <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
            {paths &&
              paths.map(({ path, name }) => (
                <Link key={path + name} to={path} className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">
                  {name}
                </Link>
              ))}
          </nav>
        </div>
        <div className="inline-flex items-center ml-1 space-x-5 lg:justify-end">
          {/* {accounts && accounts.length > 0 && (
            <span className="mr-2 font-medium leading-6 text-gray-600 hover:text-gray-900 bg-indigo-100">Connected to : {accounts[0]}</span>
          )}

          <button
            disabled={accounts && accounts.length > 0 && accounts[0] ? true : false}
            className="inline-flex items-center justify-center px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
            {accounts && accounts.length > 0 && accounts[0] ? "Connected" : "Connect to wallet"}
          </button> */}

          {!selectedAccount && (
            <button
              disabled={false}
              // onClick={connect}
              className="flex w-32 justify-center rounded-md border border-transparent bg-gray-900 py-1 px-0 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500">
              Connect Wallet
            </button>
          )}
          {selectedAccount && selectedAccount.smartAccountAddress && (
            <div className="flex-none justify-end mr-0">
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                    <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                      <span className="sr-only">Open user menu for </span>
                      {ellipseAddress(selectedAccount.smartAccountAddress, 12)}
                    </span>
                    <ChevronDownIcon className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => navigator.clipboard.writeText(selectedAccount.smartAccountAddress)}
                          className={classNames(active ? "bg-gray-100" : "", "px-4 py-2 text-sm text-gray-700 flex w-full")}>
                          <Square2StackIcon height={18} className="mt-1" />
                          <span className="ml-3 mt-1">Copy Address</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href={`https://mumbai.polygonscan.com/address/${selectedAccount.smartAccountAddress}`}
                          target="_blank"
                          rel="noreferrer"
                          className={classNames(active ? "bg-gray-100" : "", "px-4 py-2 text-sm text-gray-700 flex")}>
                          <ArrowTopRightOnSquareIcon height={18} className="mt-1" />
                          <span className="ml-3 mt-1">View on Explorer</span>
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={disconnectWallet}
                          className={classNames(active ? "bg-gray-100" : "", "px-4 py-2 text-sm text-gray-700 flex w-full")}>
                          <ArrowLeftOnRectangleIcon height={18} className="mt-1" />
                          <span className="ml-3 mt-1">Disconnect</span>
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

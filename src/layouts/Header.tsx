import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ellipseAddress, classNames } from "../utils";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ArrowTopRightOnSquareIcon, ArrowLeftOnRectangleIcon, Square2StackIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Auth, useAuth } from "@arcana/auth-react";

const paths = [
  {
    path: "/app",
    name: "App"
  }
];

export default function Header() {
  const navigate = useNavigate();
  const { loading, isLoggedIn, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [account, setAccount]: any = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      setAccount(user);
    }
  }, [loading, isLoggedIn, user]);

  const disconnectWallet = async () => {
    await logout();
    setAccount(null);
    return navigate("/");
  };

  const onLogin = () => {
    setAccount(user);
    closeModal();
    return navigate("/app");
  };

  const connectWallet = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <section className="w-full px-8 text-gray-700 bg-white">
      <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <div className="relative flex flex-col md:flex-row">
          <Link to="/" className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
            <button className="flex items-center justify-center w-8 h-8 mr-3 text-white bg-gradient-to-r from-cyan-500  to-fuchsia-500 rounded-full border-slate-400 focus:outline-none"></button>
            <span className="mx-auto ml-0 text-xl tracking-widest uppercase  leading-none text-transparent font-thin  text-slate-900 select-none">
              Aaveasy
            </span>
          </Link>
         
        </div>
        <div className="inline-flex items-center ml-1 space-x-5 lg:justify-end">
          {!account && (
            <button
              disabled={false}
              onClick={connectWallet}
              className="flex w-44 justify-center font-thin bg-gradient-to-r from-cyan-500 via-blue-400  to-fuchsia-500   rounded-md  border border-transparent bg-gray-900 py-1 px-0 text-base text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500">
              Connect Wallet
            </button>
          )}

          {account && account.address && (
            <div className="flex-none justify-end mr-0">
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                    <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                      <span className="sr-only">Open user menu for </span>
                      {ellipseAddress(account.address, 12)}
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
                          onClick={() => navigator.clipboard.writeText(account.address)}
                          className={classNames(active ? "bg-gray-100" : "", "px-4 py-2 text-sm text-gray-700 flex w-full")}>
                          <Square2StackIcon height={18} className="mt-1" />
                          <span className="ml-3 mt-1">Copy Address</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href={`https://mumbai.polygonscan.com/address/${account.address}`}
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
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto ">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel>
                  <Auth externalWallet={false} theme={"dark"} onLogin={onLogin} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </section>
  );
}

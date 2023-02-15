import React, { useState, useEffect, Fragment } from "react";
import { ArrowTopRightOnSquareIcon, ArrowDownOnSquareIcon } from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { getAllBalances, withDrawBalance } from "../../utils/functions";
import { ethers } from "ethers";

export default function Example() {
  const selectedAccount = {smartAccountAddress:"" } , wallet = {} 
  const [tokenBalances, setTokenBalances] = useState([]);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [activeToken, setActiveToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (selectedAccount && selectedAccount.smartAccountAddress) {
          refreshBalances();
        }
      } catch (error) {
        alert(error);
      }
    })();
  }, [selectedAccount]);

  const openModal = (token: any) => {
    setOpen(true);
    setActiveToken(token);
  };

  const refreshBalances = async () => {
    const bal: any = await getAllBalances(selectedAccount.smartAccountAddress);
    setTokenBalances(bal);
  };

  const withDraw = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const token: any = activeToken;
    const recipient = address;
    const contractAddress = token.contractAddress;
    const parsedAmount = ethers.utils.parseEther(amount.toString());

    // const txId = await withDrawBalance(wallet, contractAddress, recipient, parsedAmount);

    // if (txId) {
    //   wallet.on("txMined", async (response: any) => {
    //     console.log("txMined event received via emitter", response);
    //     if (response) {
    //       setLoading(false);
    //       refreshBalances();
    //       closeModal();
    //     }
    //   });
    // }
  };

  const closeModal = () => {
    setOpen(false);
    setLoading(false);
    setAddress("");
    setAmount("");
    setActiveToken(null);
  };

  return (
    <div className="flow-root mt-4">
      <main className="pb-4">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 items-start ">
            <div className="grid grid-cols-1 gap-4">
              <section aria-labelledby="recent-hires-title">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-4">
                    <div className="flow-root">
                      <ul role="navigation" className="-my-5 divide-y divide-gray-200">
                        {tokenBalances &&
                          tokenBalances.length > 0 &&
                          tokenBalances.map((token: any) => (
                            <li key={token.contractAddress} className="py-2">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                  <img className="h-10 w-10 rounded-full" src={token.meta.logo} alt="" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium text-gray-900">{token.meta.symbol}</p>
                                  <p className="truncate text-sm text-gray-500">{`${token.amount.toFixed(2)} ${token.meta.symbol}`}</p>
                                </div>
                                <div>
                                  <a
                                    href={token.meta.viewURL}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mr-3 inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <ArrowTopRightOnSquareIcon className="mr-2 -ml-0.5 h-4 w-4" aria-hidden="true" />
                                    View
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => openModal(token)}
                                    className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <ArrowDownOnSquareIcon className="mr-2 -ml-0.5 h-4 w-4" aria-hidden="true" />
                                    Withdraw
                                  </button>
                                </div>
                                <Transition.Root show={open} as={Fragment}>
                                  <Dialog as="div" className="relative z-10 " onClose={setOpen}>
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
                                          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-1 pt-2 pb-2 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                            <div className="absolute top-0 right-0 hidden pt-2 pr-2 sm:block">
                                              <button
                                                type="button"
                                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                onClick={() => closeModal()}>
                                                <span className="sr-only">Close</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                              </button>
                                            </div>
                                            <div className="container items-center max-w-6xl px-4 mx-auto">
                                              <div className="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
                                                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                                                  <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                                    Withdraw Your Balance
                                                  </h2>
                                                </div>

                                                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                                                  <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                                                    <form className="space-y-6">
                                                      <div>
                                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                          To Address
                                                        </label>
                                                        <div className="mt-1">
                                                          <input
                                                            id="email"
                                                            name="email"
                                                            type="text"
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            autoComplete="email"
                                                            required
                                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                          />
                                                        </div>
                                                      </div>

                                                      <div>
                                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                          Amount
                                                        </label>
                                                        <div className="mt-1">
                                                          <input
                                                            id="password"
                                                            name="password"
                                                            type="number"
                                                            value={amount}
                                                            onChange={(e) => setAmount(e.target.value)}
                                                            autoComplete="current-password"
                                                            required
                                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                          />
                                                        </div>
                                                      </div>

                                                      <div>
                                                        <button
                                                          disabled={loading}
                                                          onClick={(e) => withDraw(e)}
                                                          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                          {!loading ? (
                                                            "Transfer"
                                                          ) : (
                                                            <span className="flex">
                                                              <ArrowPathIcon height={18} className="mb-1 pr-2" /> Transferring crypto ...{" "}
                                                            </span>
                                                          )}
                                                        </button>
                                                      </div>
                                                    </form>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </Dialog.Panel>
                                        </Transition.Child>
                                      </div>
                                    </div>
                                  </Dialog>
                                </Transition.Root>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

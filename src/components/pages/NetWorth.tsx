import React from "react";
import { CurrencyDollarIcon, ArrowRightIcon, PaperAirplaneIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";
import { launchTransak } from "../../utils/onRamp";
import Pusher from "pusher-js";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { useAuth } from "@arcana/auth-react";

const project = { name: "Net worth", amount: "240.57", href: "#", currency: "USD", bgColor: "bg-pink-600", icon: CurrencyDollarIcon };

export default function Example() {
  const navigate = useNavigate();
  const { setTransakOrderData }: any = useGlobalContext();
  const { user } = useAuth();

  const openTransak = (productsAvailed: string) => {
    console.log(productsAvailed, "productsAvailed");

    const onRampParams = {
      apiKey: "69feba7f-a1c2-4cfa-a9bd-43072768b0e6",
      environment: "STAGING",
      fiatCurrency: "EUR",
      fiatAmount: "44",
      walletAddress: user?.address,
      email: user?.email,
      network: "ethereum",
      productsAvailed,
      widgetHeight: "700px",
      widgetWidth: "450px"
    };

    const transakWidget = launchTransak(onRampParams);

    if (transakWidget) {
      transakWidget.init();

      transakWidget.on(transakWidget.EVENTS.TRANSAK_ORDER_SUCCESSFUL, async (orderData: any) => {
        setTransakOrderData(orderData);

        let pusher = new Pusher("1d9ffac87de599c61283", { cluster: "ap2" });
        let orderId = orderData.status.id;
        let channel = pusher.subscribe(orderId);

        channel.bind(`ORDER_COMPLETED`, (orderData: any) => {
          console.log(orderData, "onlyOrderId");
          transakWidget.close();
        });

        channel.bind(`ORDER_FAILED`, (orderData: any) => {
          console.log(orderData, "onlyOrderId");
          transakWidget.close();
        });
      });
    }
  };

  return (
    <div>
      <div className="border-b border-gray-200 pt-2">
        <h2 className="leading-6 text-xl font-bold font-sans text-gray-900 ">Trade Crypto with Fiat</h2>
        <p className="mt-4 text-base text-gray-500 font-extralight">Buy & Sell crypto easily with fiat and add to your wallet</p>
      </div>
      <ul role="list" className="mt-2 pb-2">
        <li className="col-span-1 flex rounded-md shadow-sm"></li>
        <li className="col-span-1 flex rounded-md shadow-sm mt-4 justify-center">
          <button
            type="button"
            onClick={() => openTransak("BUY")}
            className="mr-7 inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-teal-500  to-teal-400 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm ">
            <ArrowDownIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Buy Crypto
          </button>
          <button
            type="button"
            onClick={() => openTransak("SELL")}
            className="inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-cyan-500  to-cyan-400  px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            <ArrowUpIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Sell Crypto
          </button>
        </li>
      </ul>
    </div>
  );
}

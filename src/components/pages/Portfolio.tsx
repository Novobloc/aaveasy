import React, { useEffect, useState } from "react";
import { getAllBalances } from "../../utils/functions";
import AssetsSupplied from "./AssetsSupplied";
import AssetsBorrowed from "./AssetsBorrowed";
import { useAuth } from "@arcana/auth-react";
import { ArrowPathIcon,} from "@heroicons/react/20/solid";





export default function Portfolio() {
  const [assetList, setAssetList] = useState([]);
  const { user }: any = useAuth();

  useEffect(() => {
    (async () => {
      const data: any = await getAllBalances(user?.address);
      setAssetList(data);
    })();
  }, [user?.address]);

  return (
    <>
      <section aria-labelledby="billing-history-heading">
        <div className="bg-white pt-6 shadow sm:overflow-hidden sm:rounded-md">
        <div className="flex  px-4 sm:px-6">
            <h2 id="billing-history-heading" className="leading-6 text-xl font-semibold text-gray-900">
              Portfolio
            </h2>
            <ArrowPathIcon className="h-6 w-6 ml-2 text-orange-500"/>
            
          </div>
          <main className="mx-auto max-w-7xl ">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
              <div className="space-y-6 sm:px-6 lg:col-span-6 lg:px-0">
                <AssetsSupplied />
              </div>
              <div className="space-y-6 sm:px-6 lg:col-span-6 lg:px-0">
                <AssetsBorrowed />
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

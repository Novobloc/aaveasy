import React, { useEffect, useState } from "react";
import { getAllBalances } from "../../utils/functions";
import AssetsSupplied from "./AssetsSupplied";
import AssetsBorrowed from "./AssetsBorrowed";
import { useAuth } from "@arcana/auth-react";

export default function Portfolio() {
  const [assetList, setAssetList] = useState([]);
  const { user }: any = useAuth();

  useEffect(() => {
    (async () => {
      const data: any = await getAllBalances(user.address);
      setAssetList(data);
    })();
  }, []);

  return (
    <>
      <section aria-labelledby="billing-history-heading">
        <div className="bg-white pt-6 shadow sm:overflow-hidden sm:rounded-md">
          <main className="mx-auto max-w-7xl pb-10 lg:py-6 lg:px-8">
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

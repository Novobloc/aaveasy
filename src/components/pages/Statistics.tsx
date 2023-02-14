import React from "react";
import NetWorth from "./NetWorth";
import Balance from "./Balance";

export default function Example() {
  return (
    <>
      {/* Main 3 column grid */}
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Left column */}

        <div className="grid grid-cols-1 gap-4">
          <section aria-labelledby="section-2-title">
            <h2 className="sr-only" id="section-2-title">
              Net Worth
            </h2>
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <NetWorth />
              </div>
            </div>
          </section>
        </div>

        {/* Right column */}

        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <section aria-labelledby="section-1-title">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <Balance />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

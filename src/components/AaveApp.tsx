import React, { Component } from "react";

import MarketPortfolio from "./pages/MarketPortfolio";
import Statistics from "./pages/Statistics";

export default class App extends Component {
  render() {
    return (
      <div className="app-container app-theme-white flex flex-col w-full text-gray-700 bg-white">
        <section className="px-2 py-0 md:px-0">
          <div className="container items-center max-w-7xl px-4 mx-auto xl:px-3">
            <div className="h-full">
              <div className="mx-auto max-w-7xl pb-10 lg:py-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <Statistics />
                  </div>
                </div>
              </div>

              <div className="mx-auto max-w-7xl pb-10 lg:py-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <MarketPortfolio />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

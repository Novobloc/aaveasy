import React, { Fragment, useState } from "react";
import Portfolio from "./Portfolio";
import MarketInfo from "./MarketInfo";

const initialTabs = [
  { name: "Portfolio", current: true, component: Portfolio },
  { name: "MarketInfo", current: false, component: MarketInfo }
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [tabs, setTabs]: any[] = useState(initialTabs);
  const [currentTab, setCurrentTab]: any = useState("Portfolio");

  const changeTab = (selectedTabItem: any) => {
    const newTabs = tabs.map((item: any) => {
      if (item.name === selectedTabItem.name) item.current = true;
      if (item.name !== selectedTabItem.name) item.current = false;
      return item;
    });
    setCurrentTab(selectedTabItem.name);
    setTabs(newTabs);
  };

  return (
    <>
      <div>
        {/* Content area */}
        {/* Tabs */}
        <div className="hidden lg:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab: any) => (
                <button
                  key={tab.name}
                  defaultValue={tab.name}
                  onClick={() => changeTab(tab)}
                  className={classNames(
                    tab.current ? "border-purple-500 text-purple-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm hover:cursor"
                  )}>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
        {currentTab === "Portfolio" ? <Portfolio /> : <MarketInfo />}
      </div>
    </>
  );
}

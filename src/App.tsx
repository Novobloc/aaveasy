import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AaveApp from "./components/AaveApp";
import UserAllBalances from "./components/pages/UserAllBalances";

/** Layout */
import Header from "./layouts/Header";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<AaveApp />} />
          <Route path="/user/balances" element={<UserAllBalances />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

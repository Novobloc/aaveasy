import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./layouts/Loader";
import Home from "./components/Home";
import AaveApp from "./components/AaveApp";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;

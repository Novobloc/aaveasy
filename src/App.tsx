import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import { useGlobalContext } from "./context/GlobalContext/GlobalContext";
import Loader from "./layouts/Loader";
import Home from "./components/Home";
import AaveApp from "./components/AaveApp";

/** Layout */
import Header from "./layouts/Header";

import { Auth, useAuth } from "@arcana/auth-react";

const onLogin = () => {
  // Route to authenticated page
};

function App() {
  const auth = useAuth();
  return (
    <div>
      {auth.loading ? (
        <Loader />
      ) : auth.isLoggedIn ? (
        <div className="app-container app-theme-white flex flex-col w-full text-gray-700 bg-white">
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/app" element={<AaveApp />} />
            </Routes>
          </Router>
        </div>
      ) : (
        <div>
          <Auth externalWallet={false} theme={"light"} onLogin={onLogin} />
        </div>
      )}
    </div>
  );
}

export default App;

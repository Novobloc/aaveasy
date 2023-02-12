import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSmartAccountContext } from "./context/SmartAccountContext/SmartAccountContext";
import { useGlobalContext } from "./context/GlobalContext/GlobalContext";
import Loader from "./layouts/Loader";
import Home from "./components/Home";
import { useWeb3AuthContext } from "./context/SocialLoginContext/SocialLoginContext";

/** Layout */
import Header from "./layouts/Header";
// import Footer from "./layouts/Footer";

const App = () => {
  const { loading } = useSmartAccountContext();
  const { loading: web3authLoading } = useWeb3AuthContext();
  const { appLoading } = useGlobalContext(); // TODO: Remove 2 loading states and use only one from GlobalContext

  if (loading || appLoading || web3authLoading) return <Loader />;

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Home />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;

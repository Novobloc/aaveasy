import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useSmartAccountContext } from "./context/SmartAccountContext/SmartAccountContext";
import { useGlobalContext } from "./context/GlobalContext/GlobalContext";
import Loader from "./layouts/Loader";
import Home from "./components/Home";
import AaveApp from "./components/AaveApp";
// import { useWeb3AuthContext } from "./context/SocialLoginContext/SocialLoginContext";

/** Layout */
import Header from "./layouts/Header";

const App = () => {
  const { appLoading } = useGlobalContext();

  if (appLoading) return <Loader />;

  return (
    <div className="app-container app-theme-white flex flex-col w-full text-gray-700 bg-white">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<AaveApp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

// import { Auth, useAuth } from "@arcana/auth-react";

// function App() {
//   const auth = useAuth();
//   const onLogin = async () => {
//     console.log("click");
    
//     console.log("connect" ,  auth.provider);
//   };
//   console.log("auth: ", auth);
//   return (
//     <div>
//       <button onClick={onLogin}> Connect </button>
//       {/* <Auth externalWallet={true} theme={"light"} /> */}
//     </div>
//   );
// }

// export default App;

// // {auth.loading ? (
// //   "Loading"
// // ) : auth.isLoggedIn ? (
// //   <p>Logged In</p>
// // ) : (
// //   <div>
// //     {/* <Auth externalWallet={true} theme={"light"} onLogin={onLogin} /> */}
// //   </div>
// // )}

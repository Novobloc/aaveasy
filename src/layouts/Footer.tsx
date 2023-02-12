import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <section className="text-gray-700 bg-white body-font">
      <div className="container flex flex-col items-center px-8 py-8 mx-auto max-w-7xl sm:flex-row">
        <a href="#_" className="text-xl font-black leading-none text-gray-900 select-none logo">
          <Link to="/" className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
            <span className="mx-auto ml-0 text-xl font-black leading-none text-pink-500 select-none">
              Aave
              <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-indigo-400  to-purple-700 lg:inline">asy</span>
            </span>
          </Link>
        </a>
      </div>
    </section>
  );
}

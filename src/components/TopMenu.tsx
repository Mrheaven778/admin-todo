"use client";
import React, { useEffect, useState } from "react";
import {
  CiBellOn,
  CiChat1,
  CiMenuBurger,
  CiSearch,
  CiSquareRemove,
} from "react-icons/ci";
import NavMobile from "./sidebar/NavMobile";




export const TopMenu = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 1024 : false
  );
  const handleMenuClick = () => {
    setIsNavVisible(!isNavVisible);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5 ${
      isNavVisible && isMobile ? " h-auto mb-72" : ""
      }`}
    >
      <div className="px-6 flex items-center justify-between space-x-4">
        <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
          Dashboard
        </h5>

        <div>
          <button
            className="w-12 h-16 -mr-2 border-r lg:hidden"
            onClick={handleMenuClick}
          >
            {isNavVisible ? (
              <CiSquareRemove size={30} />
            ) : (
              <CiMenuBurger size={30} />
            )}
          </button>
          {isMobile && isNavVisible && <NavMobile />}
        </div>

        <div className="flex space-x-2">
          <div hidden className="md:block">
            <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
              <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                <CiSearch />
              </span>
              <input
                type="search"
                name="leadingIcon"
                id="leadingIcon"
                placeholder="Search here"
                className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
              />
            </div>
          </div>

          <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
            <CiSearch />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
            <CiChat1 size={25} />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
            <CiBellOn size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Logout from "../Logout";

export const DashboardNavbar = () => {
  return (
    <>
      <nav className="w-full h-18 flex justify-center px-4 md:px-6 bg-white/80 shadow-md">
        <div className="w-full flex justify-evenly">
          <div className="w-full flex items-center">
            <Link
              href={"/"}
              className="flex items-center p-2 bg-blue-800/90 hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white text-white rounded-full transition-all duration-300"
            >
              <FaArrowLeft size={16} />
            </Link>
          </div>

          <Link
            href={"/"}
            className="w-full flex justify-center gap-2 items-center"
          >
            <img src="./../logo.png" alt="Logo" width={38} />
            <div className="flex items-center">
              <span className="text-blue-700 font-bold text-2xl md:text-3xl mt-2 text-shadow-sm">
                Entry
              </span>
              <span className="text-orange-600 font-bold text-2xl md:text-3xl mt-2 text-shadow-sm">
                Codex
              </span>
            </div>
          </Link>

          <Logout />
        </div>
      </nav>
    </>
  );
};

export default DashboardNavbar;

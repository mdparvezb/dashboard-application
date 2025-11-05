import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

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

          <div className="w-full flex justify-center items-center text-2xl font-bold text-shadow-xs">
            <h2 className="text-blue-800">Dashboard</h2>
          </div>

          <div className="w-full flex items-center justify-end">
            <IoMdLogOut size={30} className="text-red-600 cursor-pointer" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default DashboardNavbar;

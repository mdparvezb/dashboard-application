"use client";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { BsCashCoin } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { MdProductionQuantityLimits } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import Link from "next/link";

const Sidebar = ({ setProductModalOpen, setIsMobileMenu, setAddUserModal }) => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
        <p className="text-white">Jass Wahla</p>
      </div>
      <hr className="w-full my-4 border-white/20" />
      {/* Home and Dashboard Items */}
      <div className="w-full flex flex-col gap-2 px-2">
        <Link
          href={"/"}
          className="flex pl-8 py-2 items-center gap-2 rounded-md hover:bg-white/10"
        >
          <IoHomeOutline size={18} className="text-white" />
          <p className="text-white">Home</p>
        </Link>
        <Link
          href={"/admin/dashboard"}
          className="flex pl-8 py-2 items-center gap-2 rounded-md hover:bg-white/10"
        >
          <BsCashCoin size={18} className="text-white" />
          <p className="text-white">Dashboard</p>
        </Link>
      </div>
      {/* End Home and Dashboard Items */}
      <h3 className="text-sm text-white/90 py-4 px-3 tracking-wider">Users</h3>
      {/* Start User Lists */}
      <div className="w-full flex flex-col gap-2 px-2">
        <div
          onClick={() => {
            setAddUserModal(true);
            setIsMobileMenu(false);
          }}
          className="flex pl-8 py-2 items-center gap-2 rounded-md hover:bg-white/10 cursor-pointer"
        >
          <GoPlus size={18} className="text-white" />
          <p className="text-white">Add User</p>
        </div>
        <div className="flex pl-8 py-2 items-center gap-2 rounded-md hover:bg-white/10">
          <FaRegUser size={18} className="text-white" />
          <p className="text-white">View All Users</p>
        </div>
      </div>
      {/* End User Lists */}
      <h3 className="text-sm text-white/90 py-4 px-3 tracking-wider">
        Products
      </h3>
      {/* Start Product Lists */}
      <div className="w-full flex flex-col gap-2 px-2">
        {/* Add Product */}
        <div
          className="flex pl-8 py-2 items-center gap-2 rounded-md hover:bg-white/10 cursor-pointer"
          onClick={() => {
            setIsMobileMenu(false);
            setProductModalOpen(true);
          }}
        >
          <GoPlus size={18} className="text-white" />
          <p className="text-white">Add Product</p>
        </div>
        {/* View All Products */}
        <Link
          href={"/view-all-products"}
          className="flex pl-8 py-2 items-center gap-2 rounded-md hover:bg-white/10 text-white"
        >
          <MdProductionQuantityLimits size={18} className="text-white" />
          View All Products
        </Link>
      </div>
      {/* End Product Lists */}
      <h3 className="text-sm text-white/90 py-4 px-3 tracking-wider">
        View Data Entries
      </h3>
      {/* View Data Entries Starts Here */}
      <div className="w-full flex flex-col gap-2 px-2">
        {/* View Data */}
        <div className="flex pl-8 py-2 items-center gap-2 rounded-md hover:bg-white/10">
          <IoEyeOutline size={18} className="text-white" />
          <p className="text-white">Row Hygiene</p>
        </div>
        <div className="flex pl-8 py-2 items-center gap-2 rounded-md hover:bg-white/10">
          <IoEyeOutline size={18} className="text-white" />
          <p className="text-white">Rehome Furniture</p>
        </div>
        <div className="flex pl-8 py-2 items-center gap-2 rounded-md hover:bg-white/10">
          <IoEyeOutline size={18} className="text-white" />
          <p className="text-white">Ajs Wahla</p>
        </div>
        <div className="flex pl-8 py-2 items-center gap-2 rounded-md hover:bg-white/10">
          <IoEyeOutline size={18} className="text-white" />
          <p className="text-white">Expenditure</p>
        </div>
      </div>
      {/* View Data Entries Ends Here*/}

      {/* Log Out Button */}
      <div className="px-4">
        <Link
          href="#"
          className="hover:bg-white/30 bg-white/10 w-full py-2 mt-6 rounded-md text-white text-md flex justify-center items-center gap-2"
        >
          <AiOutlineLogout size={18} className="text-white" />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { PiMicrosoftExcelLogoThin } from "react-icons/pi";
import Loader from "@/components/Loader";

const ViewAjsWahlaData = () => {
  const [ajsWahlaData, setAjsWahlaData] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await axios.get(
      "/api/salestransactions/getalltransactions"
    );
    const filteredData = response.data.data.filter(
      (trans) => trans.business_type === "ajs_wahla"
    );
    setAjsWahlaData(filteredData);
  }
  return (
    <>
      {!ajsWahlaData.length > 0 && <Loader />}
      <div className="w-full flex justify-center pb-4">
        {/* Desktop Table */}
        <div className="w-full px-2 md:px-4 mt-10">
          <div className="w-full flex flex-col md:flex-row justify-between items-center">
            <Link
              href={"/"}
              className="flex gap-2 items-center px-4 py-2 bg-blue-800/90 hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white text-white rounded-sm transition-all duration-300"
            >
              <FaArrowLeft size={16} />
              Back
            </Link>
            <h2 className="w-full text-center text-orange-600 text-shadow-xs font-bold text-3xl py-2 ">
              Ajs Wahla Data
            </h2>
            <button className="flex gap-2 items-center px-4 py-2 bg-green-600 text-white hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white rounded-sm transition-all duration-300 cursor-pointer">
              <PiMicrosoftExcelLogoThin size={20} />
              Download
            </button>
          </div>
          {/* Desktop Table Starts Here */}
          <div className="w-full hidden md:block">
            <table className="w-full overflow-auto bg-gray-50">
              <thead>
                <tr className="text-white/90 font-semibold bg-orange-600">
                  <th className="text-center border border-orange-300 py-2 px-1">
                    Sl No.
                  </th>
                  <th className="text-center border border-orange-300 py-1 px-1">
                    Product Name
                  </th>
                  <th className="text-center border border-orange-300 py-1 px-1">
                    Quantity
                  </th>
                  <th className="text-center border border-orange-300 py-1 px-1">
                    Purchase Price
                  </th>
                  <th className="text-center border border-orange-300 py-1 px-1">
                    Selling Price
                  </th>
                  <th className="text-center border border-orange-300 py-1 px-1">
                    Sales Date
                  </th>
                  <th className="text-center border border-orange-300 py-1 px-1">
                    Total Purchase Price
                  </th>
                  <th className="text-center border border-orange-300 py-1 px-1">
                    Total Selling Price
                  </th>
                  <th className="text-center border border-orange-300 py-1 px-1">
                    Total Profit
                  </th>
                  <th className="text-center border border-orange-300 py-1 px-1">
                    Payment Mode
                  </th>
                  <th className="text-center border border-orange-300 py-1 px-1">
                    Business Type
                  </th>
                  <th className="text-center border border-orange-300 py-1 px-1">
                    Created By
                  </th>
                  <th className="text-center border border-orange-300 py-1 px-1">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {ajsWahlaData.map((trans, index) => (
                  <tr key={trans._id} className="text-black">
                    <td className="text-center border border-orange-300 py-1 px-1">
                      {index + 1}
                    </td>
                    <td className="text-center border border-orange-300 py-1 px-1">
                      {trans.product_name}
                    </td>
                    <td className="text-center border border-orange-300 py-1 px-1">
                      {trans.quantity}
                    </td>
                    <td className="text-center border border-orange-300 py-1 px-1">
                      {trans.unit_purchase_price}
                    </td>
                    <td className="text-center border border-orange-300 py-1 px-1">
                      {trans.unit_selling_price}
                    </td>
                    <td className="text-center border border-orange-300 py-1 px-1">
                      {new Date(trans.createdAt).toLocaleString("default", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="text-center border border-orange-300 py-1 px-1">
                      {trans.total_purchase_price}
                    </td>
                    <td className="text-center border border-orange-300 py-1 px-1">
                      {trans.total_selling_price}
                    </td>
                    <td className="text-center border border-orange-300 py-1 px-1">
                      {trans.total_profit}
                    </td>
                    <td className="text-center border border-orange-300 py-1 px-1">
                      {trans.payment_mode}
                    </td>
                    <td className="text-center border border-orange-300 py-1 px-1">
                      {trans.business_type}
                    </td>
                    <td className="text-center border border-orange-300 py-1 px-1">
                      {trans.user_name}
                    </td>
                    <td className="text-center border border-orange-300 py-1 px-1">
                      <div className="w-full flex justify-center items-center gap-2">
                        <BiEdit size={22} className="text-blue-600" />
                        <MdOutlineDelete size={25} className="text-red-600" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Desktop Table Starts Here */}
          {/* Mobile Table Starts Here */}
          <div className="w-full md:hidden flex flex-col justify-center gap-4 mt-4">
            {/* Table Main */}
            {ajsWahlaData.map((trans, index) => (
              <div
                key={trans._id}
                className="w-full bg-[bisque]/50 border border-orange-200 shadow-md"
              >
                {/* Mobile Table Headings and Data */}
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Sl No.</p>
                  <p className="px-4 py-2 border-l-1 border-orange-200 font-semibold">
                    {index + 1}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Product Name</p>
                  <p className="px-4 py-2 border-l-1 border-orange-200 font-semibold">
                    {trans.product_name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Quantity</p>
                  <p className="px-4 py-2 border-l-1 border-orange-200 font-semibold">
                    {trans.quantity}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Purchase Price</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {trans.unit_purchase_price}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Selling Price</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {trans.unit_selling_price}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Sales Date</p>
                  <div className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {new Date(trans.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 text-sm font-semibold">
                    Total Purchase Price
                  </p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {trans.total_purchase_price}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Total Selling Price</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {trans.total_selling_price}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Total Profit</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {trans.total_profit}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Payment Mode</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {trans.payment_mode}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Business Type</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {trans.business_type}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Created By</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {trans.user_name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Actions</p>
                  <div className="px-4 py-2 border-l border-orange-200 font-semibold">
                    <div className="w-full flex items-center gap-4">
                      <BiEdit size={22} className="text-blue-600" />
                      <MdOutlineDelete size={25} className="text-red-600" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAjsWahlaData;

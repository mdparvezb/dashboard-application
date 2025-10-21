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
    console.log(filteredData);
    setAjsWahlaData(filteredData);
  }
  return (
    <>
          {!ajsWahlaData.length > 0 && <Loader />}
    <div className="w-full flex justify-center pb-4">
      {/* Desktop Table */}
      <div className="w-full md:px-4 mt-10">
        <div className="w-full flex justify-between items-center">
          <Link
            href={"/"}
            className="flex gap-2 items-center px-4 py-2 bg-white/90 hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white text-black rounded-sm transition-all duration-300"
          >
            <FaArrowLeft size={16} />
            Back
          </Link>
          <h2 className="w-full text-center text-white font-bold text-3xl py-2 ">
            Row Hygiene Data
          </h2>
          <button className="flex gap-2 items-center px-4 py-2 bg-green-600 text-white hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white rounded-sm transition-all duration-300 cursor-pointer">
            <PiMicrosoftExcelLogoThin size={20} />
            Download
          </button>
        </div>
        {/* Table For Product View */}
        <div className="w-full h-screen overflow-auto">
          <table className="w-full max-h-screen overflow-auto">
            <thead>
              <tr className="text-white/90 font-semibold bg-orange-600">
                <th className="text-center border-1 border-white/60 py-2 px-1">
                  Sl No.
                </th>
                <th className="text-center border-1 border-white/60 py-1 px-1">
                  Product Name
                </th>
                <th className="text-center border-1 border-white/60 py-1 px-1">
                  Quantity
                </th>
                <th className="text-center border-1 border-white/60 py-1 px-1">
                  Purchase Price
                </th>
                <th className="text-center border-1 border-white/60 py-1 px-1">
                  Selling Price
                </th>
                <th className="text-center border-1 border-white/60 py-1 px-1">
                  Sales Date
                </th>
                <th className="text-center border-1 border-white/60 py-1 px-1">
                  Total Purchase Price
                </th>
                <th className="text-center border-1 border-white/60 py-1 px-1">
                  Total Selling Price
                </th>
                <th className="text-center border-1 border-white/60 py-1 px-1">
                  Total Profit
                </th>
                <th className="text-center border-1 border-white/60 py-1 px-1">
                  Payment Mode
                </th>
                <th className="text-center border-1 border-white/60 py-1 px-1">
                  Business Type
                </th>
                <th className="text-center border-1 border-white/60 py-1 px-1">
                  Created By
                </th>
                <th className="text-center border-1 border-white/60 py-1 px-1">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {ajsWahlaData.map((trans, index) => (
                <tr key={trans._id} className="text-white/80 ">
                  <td className="text-center border-1 border-white/60 py-1 px-1">
                    {index + 1}
                  </td>
                  <td className="text-center border-1 border-white/60 py-1 px-1">
                    {trans.produc_name}
                  </td>
                  <td className="text-center border-1 border-white/60 py-1 px-1">
                    {trans.quantity}
                  </td>
                  <td className="text-center border-1 border-white/60 py-1 px-1">
                    {trans.unit_purchase_price}
                  </td>
                  <td className="text-center border-1 border-white/60 py-1 px-1">
                    {trans.unit_selling_price}
                  </td>
                  <td className="text-center border-1 border-white/60 py-1 px-1">
                    {new Date(trans.createdAt).toLocaleString("default", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="text-center border-1 border-white/60 py-1 px-1">
                    {trans.total_purchase_price}
                  </td>
                  <td className="text-center border-1 border-white/60 py-1 px-1">
                    {trans.total_selling_price}
                  </td>
                  <td className="text-center border-1 border-white/60 py-1 px-1">
                    {trans.total_profit}
                  </td>
                  <td className="text-center border-1 border-white/60 py-1 px-1">
                    {trans.payment_mode}
                  </td>
                  <td className="text-center border-1 border-white/60 py-1 px-1">
                    {trans.business_type}
                  </td>
                  <td className="text-center border-1 border-white/60 py-1 px-1">
                    {trans.user_name}
                  </td>
                  <td className="text-center border-1 border-white/60 py-1 px-1">
                    <div className="w-full flex justify-center items-center gap-2">
                      <BiEdit size={22} className="text-white/80" />
                      <MdOutlineDelete size={25} className="text-red-600" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default ViewAjsWahlaData;

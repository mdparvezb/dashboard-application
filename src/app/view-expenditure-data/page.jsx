"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Barcode from "react-barcode";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { PiMicrosoftExcelLogoThin } from "react-icons/pi";

const ViewExpenditureData = () => {
  const [expenditureData, setExpenditureData] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await axios.get("/api/expenditure/getalltransaction");
    setExpenditureData(response.data.data);
  }
  return (
    <div className="w-full flex justify-center pb-4">
      {/* Desktop Table */}
      <div className="w-full md:px-8 mt-10">
        <div className="w-full flex justify-between items-center">
          <Link
            href={"/"}
            className="flex gap-2 items-center px-4 py-2 bg-white/90 hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white text-black rounded-sm transition-all duration-300"
          >
            <FaArrowLeft size={16} />
            Back
          </Link>
          <h2 className="w-full text-center text-white font-bold text-3xl py-2 ">
            All Products
          </h2>
          <button className="flex gap-2 items-center px-4 py-2 bg-green-600 text-white hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white rounded-sm transition-all duration-300 cursor-pointer">
            <PiMicrosoftExcelLogoThin size={20} />
            Download
          </button>
        </div>
        {/* Table For Product View */}
        <table className="w-full h-screen overflow-y-scroll">
          <thead>
            <tr className="text-white/90 font-semibold bg-black/70">
              <th className="text-center border-1 border-white/60 py-2 px-1">
                Sl No.
              </th>
              <th className="text-center border-1 border-white/60 py-1 px-1">
                Expenses Category
              </th>
              <th className="text-center border-1 border-white/60 py-1 px-1">
                Description
              </th>
              <th className="text-center border-1 border-white/60 py-1 px-1">
                Amount
              </th>
              <th className="text-center border-1 border-white/60 py-1 px-1">
                Payment Mode
              </th>
              <th className="text-center border-1 border-white/60 py-1 px-1">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {expenditureData.map((trans, index) => (
              <tr key={trans._id} className="text-white/80 ">
                <td className="text-center border-1 border-white/60 py-1 px-1">
                  {index + 1}
                </td>
                <td className="text-center border-1 border-white/60 py-1 px-1">
                  {trans.expense_category}
                </td>
                <td className="text-center border-1 border-white/60 py-1 px-1">
                  {trans.description}
                </td>
                <td className="text-center border-1 border-white/60 py-1 px-1">
                  {trans.amount}
                </td>
                <td className="text-center border-1 border-white/60 py-1 px-1">
                  {new Date(trans.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
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
  );
};

export default ViewExpenditureData;

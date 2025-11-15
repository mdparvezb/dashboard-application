"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import DownloadExcel from "@/components/DownloadExcel";
import NoDataPage from "@/components/NoDataPage";

const ViewExpenditureData = () => {
  const [expenditureData, setExpenditureData] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
    getUser();
  }, []);

  async function fetchTransactions() {
    setLoading(true);
    const response = await axios.get("/api/expenditure/getalltransaction");
    setExpenditureData(response.data.data);
    setLoading(false);
  }

  // Delete Expense Transaction
  //  Delete Function
  async function deleteTransaction(id) {
    setLoading(true);
    const response = await axios.delete("/api/expenditure/deletetransbyid", {
      params: {
        id: id,
      },
    });
    fetchTransactions();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  }

  // Get User Data
  async function getUser() {
    const response = await axios.get("api/users/me");
    return setUser(response.data.data || "");
  }
  return (
    <>
      {loading && <Loader />}
      <div className="w-full flex justify-center pb-4">
        <div className="w-full px-2 md:px-4 mt-10">
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2">
            <Link
              href={"/"}
              className="flex gap-2 items-center px-4 py-2 bg-blue-800/90 hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white text-white rounded-sm transition-all duration-300"
            >
              <FaArrowLeft size={16} />
              Back
            </Link>
            <h2 className="w-full text-center text-red-700 font-bold text-shadow-xs text-3xl py-2 ">
              All Expenditures
            </h2>
            <DownloadExcel
              data={expenditureData}
              fileName={"Expenditure-Data"}
            />
          </div>
          {/* Desktop Table */}
          {/* Table For Product View */}
          <div className="w-full hidden md:flex md:flex-col">
            {!expenditureData.length > 0 ? (
              <NoDataPage />
            ) : (
              <table className="w-full overflow-y-auto bg-gray-50">
                <thead>
                  <tr className="text-white/90 font-semibold bg-red-800/80">
                    <th className="text-center border border-orange-300 py-2 px-1">
                      Sl No.
                    </th>
                    <th className="text-center border border-orange-300 py-1 px-1">
                      Expenses Category
                    </th>
                    <th className="text-center border border-orange-300 py-1 px-1">
                      Description
                    </th>
                    <th className="text-center border border-orange-300 py-1 px-1">
                      Amount
                    </th>
                    <th className="text-center border border-orange-300 py-1 px-1">
                      Expense Date
                    </th>
                    <th className="text-center border border-orange-300 py-1 px-1">
                      Payment Mode
                    </th>
                    {user.user_role === "Admin" && (
                      <th className="text-center border border-orange-300 py-1 px-1">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {expenditureData.map((trans, index) => (
                    <tr key={trans._id} className="text-black ">
                      <td className="text-center border border-orange-300 py-1 px-1">
                        {index + 1}
                      </td>
                      <td className="text-center border border-orange-300 py-1 px-1">
                        {trans.expense_category}
                      </td>
                      <td className="text-center border border-orange-300 py-1 px-1">
                        {trans.description}
                      </td>
                      <td className="text-center border border-orange-300 py-1 px-1">
                        {trans.amount}
                      </td>
                      <td className="text-center border border-orange-300 py-1 px-1">
                        {new Date(trans.expense_date).toLocaleString(
                          "default",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td className="text-center border border-orange-300 py-1 px-1">
                        {trans.payment_mode}
                      </td>

                      {user.user_role === "Admin" && (
                        <td className="text-center border border-orange-300 py-1 px-1">
                          <div className="w-full flex justify-center items-center gap-2">
                            <MdOutlineDelete
                              size={25}
                              onClick={() => deleteTransaction(trans._id)}
                              className="text-red-600 cursor-pointer"
                            />
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {/* Desktop Table Ends Here*/}

          {/* Mobile Table Starts Here*/}

          <div className="w-full md:hidden flex flex-col justify-center gap-4 mt-4">
            {/* Table Main */}
            {!expenditureData.length > 0 && <NoDataPage />}
            {expenditureData.map((trans, index) => (
              <div
                key={trans._id}
                className="w-full bg-[bisque]/50 border border-orange-200 shadow-md"
              >
                {/* Mobile Table Headings and Data */}
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Sl No.</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {index + 1}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Expense Category</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {trans.expense_category}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Description</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {trans.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Amount</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {trans.amount}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Payment Mode</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {trans.payment_mode}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Date</p>
                  <div className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {new Date(trans.expense_date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
                {user.user_role === "Admin" && (
                  <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                    <p className="px-4 py-2 font-semibold">Actions</p>
                    <div className="px-4 py-2 border-l border-orange-200 font-semibold">
                      <div className="w-full flex items-center gap-4">
                        <MdOutlineDelete
                          size={25}
                          onClick={() => deleteTransaction(trans._id)}
                          className="text-red-600"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewExpenditureData;

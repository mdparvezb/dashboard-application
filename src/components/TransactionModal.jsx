"use client";
import axios from "axios";
import React, { useState } from "react";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import Loader from "./Loader";

const TransactionModal = ({
  businessName,
  businessType,
  setTransactionModalOpen,
  transactionModalOpen,
}) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");

  const [unitPurchasePrice, setUnitPurchasePrice] = useState("");
  const [unitSellingPrice, setUnitSellingPrice] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [loading, setLoading] = useState(false);
  const inputData = [
    {
      labelName: "Product Name",
      inputType: "text",
      defaultValue: productName,
      setOnchange: setProductName,
      className: "",
    },
    {
      labelName: "Quantity",
      inputType: "number",
      defaultValue: quantity,
      setOnchange: setQuantity,
      className: "appearance-none",
    },
    {
      labelName: "Sales Date",
      inputType: "date",
      defaultValue: date,
      setOnchange: setDate,
      className: "appearance-none",
    },
    {
      labelName: "Unit Purchase Price",
      inputType: "number",
      defaultValue: unitPurchasePrice,
      setOnchange: setUnitPurchasePrice,
      className: "appearance-none",
    },
    {
      labelName: "Unit Selling Price",
      inputType: "Number",
      defaultValue: unitSellingPrice,
      setOnchange: setUnitSellingPrice,
      className: "appearance-none",
    },
  ];

  // Transaction Save Handler
  async function transactionSaveHandler(e) {
    e.preventDefault();
    if (
      !productName ||
      !quantity ||
      !unitPurchasePrice ||
      !unitSellingPrice ||
      !date
    ) {
      return toast.warning("All fields are required!");
    }
    setLoading(true);
    const data = {
      business_type: businessType,
      user_name: "Default",
      product_name: productName.trim(),
      quantity: Number(quantity),
      sales_date: date,
      unit_purchase_price: Number(unitPurchasePrice),
      unit_selling_price: Number(unitSellingPrice),
      payment_mode: paymentMode.trim(),
      total_purchase_price: Number(quantity * unitPurchasePrice),
      total_selling_price: Number(quantity * unitSellingPrice),
      total_profit:
        Number(quantity * unitSellingPrice) -
        Number(quantity * unitPurchasePrice),
    };

    const response = await axios.post(
      "/api/salestransactions/savetransaction",
      data
    );
    setTransactionModalOpen(false);
    setLoading(false);
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className="w-full h-screen bg-black/80 px-6 backdrop-blur-[2px] z-50 absolute left-0 flex justify-center items-center pointer-none transition-opacity duration-500">
        <div className="w-full md:max-w-[500px] flex flex-col bg-white py-4 px-6 shadow-[0_10px_36px_0_rgba(0, 0, 0, 0.16), 0_0_0_1px_rgba(0, 0, 0, 0.06)] rounded-xl">
          <h2 className="text-2xl text-blue-600 font-bold text-center">
            {businessName}
          </h2>
          <div className="w-full flex flex-col gap-2 items-center py-4">
            {/* All Inputs */}
            {inputData.map((item, index) => (
              <div
                key={index}
                className="w-full flex flex-col gap-0.5 text-black/90 tracking-wider"
              >
                <label>{item.labelName}</label>
                <input
                  type={item.inputType}
                  value={item.defaultValue}
                  onChange={(e) => item.setOnchange(e.target.value)}
                  className={`${item.className} bg-white/10 px-4 py-2  w-full text-black focus:outline-none  border-black-50 border rounded-full`}
                />
              </div>
            ))}
            {/* Payment Mode input */}
            <div className="w-full flex flex-col gap-0.5 text-black/90">
              <label>Payment Mode</label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="bg-white/10 text-black/90 px-4 py-2 w-fulloutline-none appearance-none rounded-full border-black-50 border cursor-pointer focus:outline-none"
              >
                <option value="Cash" className="text-black">
                  Cash
                </option>
                <option value="Bank" className="text-black">
                  Bank
                </option>
              </select>
            </div>
          </div>
          <div className="flex justify-center gap-2 py-2">
            <button
              onClick={transactionSaveHandler}
              className="w-full flex flex-1 gap-2 justify-center items-center py-2 rounded-full shadow-xl hover:opacity-90 bg-[green] cursor-pointer text-white text-lg"
            >
              <BiSave size={20} /> Save
            </button>
            <button
              onClick={() => setTransactionModalOpen(false)}
              className="w-full flex flex-1 gap-2 justify-center items-center py-2 rounded-full shadow-xl hover:opacity-90 transition-all duration-300 bg-[red] cursor-pointer text-white text-lg"
            >
              <IoIosCloseCircleOutline size={20} /> Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionModal;

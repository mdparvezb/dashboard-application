"use client";
import axios from "axios";
import React, { useState } from "react";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

const TransactionModal = ({
  businessName,
  businessType,
  setTransactionModalOpen,
}) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPurchasePrice, setUnitPurchasePrice] = useState("");
  const [unitSellingPrice, setUnitSellingPrice] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");

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
      inputType: "Number",
      defaultValue: quantity,
      setOnchange: setQuantity,
      className: "appearance-none",
    },
    {
      labelName: "Unit Purchase Price",
      inputType: "Number",
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
    if (!productName || !quantity || !unitPurchasePrice || !unitSellingPrice) {
      return toast.warning("All fields are required!");
    }
    const data = {
      busniess_type: businessType,
      user_name: "Default",
      produc_name: productName.trim(),
      quantity: Number(quantity),
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
      "/api/transactions/savetransaction",
      data
    );
    console.log(response.data.data);
    setTransactionModalOpen(false);
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <div className="w-full bg-black/80 px-6 h-[100vh] backdrop-blur-[2px] z-50 absolute top-0 left-0 flex justify-center items-center pointer-none transition-opacity duration-500">
      <div className="w-full md:max-w-[500px] flex flex-col bg-[#191970] py-4 px-6 shadow-[0_10px_36px_0_rgba(0, 0, 0, 0.16), 0_0_0_1px_rgba(0, 0, 0, 0.06)] rounded-xl">
        <h2 className="text-2xl text-white font-bold text-center">
          {businessName}
        </h2>
        <div className="w-full flex flex-col gap-2 items-center py-4">
          {/* All Inputs */}
          {inputData.map((item, index) => (
            <div
              key={index}
              className="w-full flex flex-col gap-0.5 text-white/90 tracking-wider"
            >
              <label>{item.labelName}</label>
              <input
                type={item.inputType}
                value={item.defaultValue}
                onChange={(e) => item.setOnchange(e.target.value)}
                className={`${item.className} bg-white/10 px-4 py-2  w-full text-white focus:outline-none  border-amber-50 border-1 rounded-full`}
              />
            </div>
          ))}
          {/* Payment Mode input */}
          <div className="w-full flex flex-col gap-0.5 text-white/90">
            <label>Payment Mode</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="bg-white/10 text-white/90 px-4 py-2 w-fulloutline-none appearance-none rounded-full border-amber-50 border-1 focus:outline-none"
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
  );
};

export default TransactionModal;

import axios from "axios";
import React, { useState } from "react";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import Loader from "./Loader";

const ExpenditureModal = ({ businessName, setExpenditureModalOpen }) => {
  const [expenseCategory, setExpenseCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const inputData = [
    {
      labelName: "Expense Category",
      inputType: "text",
      defaultValue: expenseCategory,
      setOnchange: setExpenseCategory,
      className: "",
    },
    {
      labelName: "Description",
      inputType: "text",
      defaultValue: description,
      setOnchange: setDescription,
      className: "",
    },
    {
      labelName: "Expense Date",
      inputType: "date",
      defaultValue: date,
      setOnchange: setDate,
      className: "appearance-none",
    },

    {
      labelName: "Amount",
      inputType: "Number",
      defaultValue: amount,
      setOnchange: setAmount,
      className: "appearance-none",
    },
  ];

  // Save Handler
  async function expenditureSaveHandler(e) {
    e.preventDefault();
    if (!expenseCategory || !description || !amount || !paymentMode) {
      return toast.warning("All fields are required!");
    }
    setLoading(true);
    const data = {
      user_name: "default",
      expense_category: expenseCategory.trim(),
      description: description.trim(),
      expense_date: date,
      amount: amount,
      payment_mode: paymentMode,
    };

    const response = await axios.post("/api/expenditure/savetransaction", data);
    setExpenditureModalOpen(false);
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
      <div className="w-full bg-black/80 px-6 h-screen backdrop-blur-[2px] z-50 fixed top-0 left-0 flex justify-center items-center pointer-none">
        <div className="w-full md:max-w-[500px] flex flex-col bg-white py-4 px-6 shadow-[0_10px_36px_0_rgba(0, 0, 0, 0.16), 0_0_0_1px_rgba(0, 0, 0, 0.06)] rounded-xl">
          <h2 className="text-2xl text-red-600 font-bold text-center">
            {businessName}
          </h2>
          <div className="w-full flex flex-col gap-2 items-center py-4">
            {/* All Inputs */}
            {inputData.map((item, index) => (
              <div
                key={index}
                className="w-full flex flex-col gap-0.5 text-black/90 font-semibold tracking-wider"
              >
                <label>{item.labelName}</label>
                <input
                  type={item.inputType}
                  value={item.defaultValue}
                  onChange={(e) => item.setOnchange(e.target.value)}
                  className={`${item.className} bg-white/10 px-4 py-2  w-full text-black focus:outline-none border-black-50 font-semibold border rounded-full`}
                />
              </div>
            ))}
            {/* Payment Mode input */}
            <div className="w-full flex flex-col gap-0.5 font-semibold text-black/90">
              <label>Payment Mode</label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="bg-white/10 text-black/90 px-4 py-2 w-fulloutline-none appearance-none rounded-full font-semibold border-black-50 border focus:outline-none"
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
              onClick={expenditureSaveHandler}
              className="w-full flex flex-1 py-2 gap-2 justify-center items-center rounded-full shadow-xl hover:opacity-90 transition-all duration-300 bg-[green] cursor-pointer text-white text-lg"
            >
              <BiSave size={20} /> Save
            </button>
            <button
              onClick={() => setExpenditureModalOpen(false)}
              className="w-full flex flex-1 py-2 gap-2 justify-center items-center rounded-full shadow-xl hover:opacity-90 transition-all duration-300 bg-[red] cursor-pointer text-white text-lg"
            >
              <IoIosCloseCircleOutline size={20} /> Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenditureModal;

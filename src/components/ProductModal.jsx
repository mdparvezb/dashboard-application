import axios from "axios";
import React, { useState } from "react";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import Loader from "./Loader";

const ProductModal = ({ setProductModalOpen }) => {
  const [productName, setProductName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [businessType, setBusinessType] = useState("rehome_furniture");
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
      labelName: "Purchase Date",
      inputType: "date",
      defaultValue: purchaseDate,
      setOnchange: setPurchaseDate,
      className: "appearance-none",
    },
    {
      labelName: "Purchase Price",
      inputType: "number",
      defaultValue: purchasePrice,
      setOnchange: setPurchasePrice,
      className: "appearance-none",
    },
    {
      labelName: "Quantity",
      inputType: "Number",
      defaultValue: quantity,
      setOnchange: setQuantity,
      className: "appearance-none",
    },
  ];
  console.log(businessType);
  // Save Handler
  async function productSaveHandler(e) {
    e.preventDefault();
    if (!productName || !purchaseDate || !purchasePrice || !quantity) {
      return toast.warning("All fields are required!");
    }
    setLoading(true);
    const data = {
      product_name: productName.trim(),
      purchase_date: purchaseDate.trim(),
      purchase_price: purchasePrice.trim(),
      quantity: quantity.trim(),
      business_type: businessType.trim(),
    };

    const response = await axios.post("/api/product", data);
    setProductModalOpen(false);
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
      <div className="w-full bg-black/80 px-6 h-[100vh] backdrop-blur-[2px] z-50 absolute top-0 left-0 flex justify-center items-center pointer-none overflow-hidden">
        <div className="w-full md:max-w-[500px] flex flex-col bg-blue-900 py-4 px-4 md:px-6 shadow-[0_10px_36px_0_rgba(0, 0, 0, 0.16), 0_0_0_1px_rgba(0, 0, 0, 0.06)] rounded-xl">
          <h2 className="text-2xl text-white font-bold text-center">
            Add Product
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
            {/* Drop Down Menu for Business Type */}
            <div className="w-full flex flex-col gap-0.5 text-white/90 tracking-wider">
              <label className="text-white/90">Business Type</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className={`appearance-none bg-white/10 px-4 py-2  w-full text-white focus:outline-none  border-amber-50 border-1 rounded-full`}
              >
                <option value="rehome_furniture" className="text-black">
                  Rehome Furniture
                </option>
                <option value="row_hygiene" className="text-black">
                  Row Hygiene
                </option>
                <option value="ajs_wahla" className="text-black">
                  Ajs Wahla
                </option>
              </select>
            </div>
          </div>
          {/* Save and close Button */}
          <div className="flex justify-center gap-2 py-2">
            <button
              onClick={productSaveHandler}
              className="w-full flex flex-1 py-2 gap-2 justify-center items-center rounded-full shadow-xl hover:opacity-90 transition-all duration-300 bg-[green] cursor-pointer text-white text-sm md:text-lg"
            >
              <BiSave size={20} /> Save Product
            </button>
            <button
              onClick={() => setProductModalOpen(false)}
              className="w-full flex flex-1 py-2 gap-2 justify-center items-center rounded-full shadow-xl hover:opacity-90 transition-all duration-300 bg-[red] cursor-pointer text-white text-sm md:text-lg"
            >
              <IoIosCloseCircleOutline size={20} /> Close
            </button>
          </div>
        </div>
      </div>
      )
    </>
  );
};

export default ProductModal;

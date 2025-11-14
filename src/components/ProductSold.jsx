import React, { useState } from "react";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Loader from "./Loader";
import axios from "axios";
import { toast } from "react-toastify";

const ProductSold = ({ loading, setUpdateModal, setLoading, productId }) => {
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [status, setStatus] = useState("Sold");
  // User Save Handler
  async function updateHandler(e) {
    e.preventDefault();
    setLoading(true);
    const data = {
      status: status,
      sold_payment_mode: status === "Unsold" ? "NA" : paymentMode,
    };
    const response = await axios.put(`/api/product/update/`, data, {
      params: { id: productId },
    });
    setUpdateModal(false);
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
      <div className="w-full bg-black/80 px-6 h-screen backdrop-blur-[2px] z-99 fixed left-0 flex justify-center items-center pointer-none overflow-hidden">
        <div className="w-full md:max-w-[500px] flex flex-col bg-white py-4 px-4 md:px-6 shadow-[0_10px_36px_0_rgba(0, 0, 0, 0.16), 0_0_0_1px_rgba(0, 0, 0, 0.06)] rounded-xl">
          <h2 className="text-2xl text-black font-bold text-shadow-xs text-center">
            Update Product Status
          </h2>
          <div className="w-full flex flex-col gap-2 items-center py-4">
            <div className="w-full flex flex-col font-semibold gap-0.5 text-black/90">
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-white/10 text-black/90 px-4 py-2 w-fulloutline-none appearance-none rounded-full border-black-50 font-semibold border focus:outline-none"
              >
                <option value="Sold" className="text-black">
                  Sold
                </option>
                <option value="Unsold" className="text-black">
                  Unsold
                </option>
              </select>
            </div>

            {status === "Sold" && (
              <div className="w-full flex flex-col font-semibold gap-0.5 text-black/90">
                <label>Sold Payment Mode</label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="bg-white/10 text-black/90 px-4 py-2 w-fulloutline-none appearance-none rounded-full border-black-50 font-semibold border focus:outline-none"
                >
                  <option value="Cash" className="text-black">
                    Cash
                  </option>
                  <option value="Bank" className="text-black">
                    Bank
                  </option>
                </select>
              </div>
            )}

            {/* Save and close Button */}
            <div className="flex justify-center gap-2 mt-2 py-2 w-full">
              <button
                onClick={updateHandler}
                className="w-full flex flex-1 py-2 gap-2 justify-center items-center rounded-full shadow-xl hover:opacity-90 transition-all duration-300 bg-[green] cursor-pointer text-white text-sm md:text-lg"
              >
                <BiSave size={20} /> Update
              </button>
              <button
                onClick={() => setUpdateModal(false)}
                className="w-full flex flex-1 py-2 gap-2 justify-center items-center rounded-full shadow-xl hover:opacity-90 transition-all duration-300 bg-[red] cursor-pointer text-white text-sm md:text-lg"
              >
                <IoIosCloseCircleOutline size={20} /> Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSold;

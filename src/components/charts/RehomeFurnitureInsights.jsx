import React from "react";
import { GiCash } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import { BsCashCoin } from "react-icons/bs";
import { RiWaterPercentFill } from "react-icons/ri";

const RehomeFurnitureInsights = ({
  RFPurchasePrice,
  RFSellingPrice,
  RFTotalProfit,
  RFMargin,
}) => {
  return (
    <div className="w-full flex flex-col items-center py-4 bg-blue-600/40 shadow-md rounded-sm">
      <div>
        <h2 className="text-lg text-shadow-xs font-bold text-[black]/80">
          Rehome Furniture
        </h2>
      </div>
      <div className="px-2 w-full grid grid-cols-2 gap-2 mt-4">
        {/* Total Cost Price */}
        <div className="flex flex-col gap-2 justify-center items-center p-4 shadow-md bg-white rounded-sm">
          <p className="text-sm">Total Cost</p>
          <div className="flex justify-center items-center gap-2 text-xl">
            <GiCash size={25} className="text-red-600" />
            <p className="text-center">{RFPurchasePrice}</p>
          </div>
        </div>
        {/* Total Selling Price */}
        <div className="flex flex-col gap-2 justify-center items-center p-4 shadow-md bg-white rounded-sm">
          <p className="text-sm">Total Sales</p>
          <div className="flex justify-center gap-2 items-center text-xl">
            <FcSalesPerformance size={25} className="text-green-600" />
            <p className="text-center">{RFSellingPrice}</p>
          </div>
        </div>
        {/* Total Profit */}
        <div className="flex flex-col gap-2 justify-center items-center p-4 shadow-md bg-white rounded-sm">
          <p className="text-sm">Profit</p>
          <div className="flex justify-center gap-2 items-center text-xl">
            <BsCashCoin size={25} className="text-blue-600" />
            <p className="text-center">{RFTotalProfit}</p>
          </div>
        </div>
        {/* Total Margin */}
        <div className="flex flex-col gap-2 justify-center items-center p-4 shadow-md bg-white rounded-sm">
          <p className="text-sm">Margin%</p>
          <div className="flex justify-center gap-2 items-center text-xl">
            <RiWaterPercentFill size={25} className="text-blue-600" />
            <p className="text-center">{RFMargin}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RehomeFurnitureInsights;

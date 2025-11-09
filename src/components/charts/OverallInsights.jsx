import React from "react";
import { GiCash } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import { BsCashCoin } from "react-icons/bs";
import { IoCash } from "react-icons/io5";
import { totalCalculateFn } from "@/app/utils/totalCalculateFn";

const OverallInsights = ({ filteredSalesData, fitleredExpenditureData }) => {

  // Over All Sales Total
    const overAllPurchasePrice = Math.round(
      totalCalculateFn(filteredSalesData, "total_purchase_price")
    )

    const overAllSellingPrice = Math.round(
      totalCalculateFn(filteredSalesData, "total_selling_price")
    );

    // Total Expenditure
    const overAllExpenditure = Math.round(
      totalCalculateFn(fitleredExpenditureData, "amount")
    );

    const overAllTotalProfit = Math.round(
      totalCalculateFn(filteredSalesData, "total_profit")
    );

    // Net Profit (Profit - Expenditure)
    const netProfit = (overAllTotalProfit || 0) - (overAllExpenditure || 0);

    const overAllMargin = Math.round(
      (((overAllSellingPrice || 0) - (overAllPurchasePrice || 0)) /
        (overAllSellingPrice || 0)) *
        100
    );


  return (
    <div className="w-full flex flex-col items-center py-4 bg-blue-600/40 shadow-md rounded-sm">
      <div>
        <h2 className="text-lg text-shadow-xs font-bold text-[black]/80">
          Over All Business
        </h2>
      </div>
      <div className="px-2 w-full grid grid-cols-2 gap-2 mt-4">
        {/* Total Cost Price */}
        <div className="flex flex-col gap-2 justify-center items-center p-4 shadow-md bg-white rounded-sm">
          <p className="text-sm">Total Cost</p>
          <div className="flex justify-center items-center gap-2 text-xl">
            <GiCash size={25} className="text-red-600" />
            <p className="text-center">{overAllPurchasePrice}</p>
          </div>
        </div>
        {/* Total Selling Price */}
        <div className="flex flex-col gap-2 justify-center items-center p-4 shadow-md bg-white rounded-sm">
          <p className="text-sm">Total Sales</p>
          <div className="flex justify-center gap-2 items-center text-xl">
            <FcSalesPerformance size={25} className="text-green-600" />
            <p className="text-center">{overAllSellingPrice}</p>
          </div>
        </div>
        {/* Total Profit */}
        <div className="flex flex-col gap-2 justify-center items-center p-4 shadow-md bg-white rounded-sm">
          <p className="text-sm">Net Profit</p>
          <div className="flex justify-center gap-2 items-center text-xl">
            <BsCashCoin size={25} className="text-blue-600" />
            <p className="text-center">{netProfit}</p>
          </div>
        </div>
        {/* Total Margin */}
        <div className="flex flex-col gap-2 justify-center items-center p-4 shadow-md bg-white rounded-sm">
          <p className="text-sm">Expenditure</p>
          <div className="flex justify-center gap-2 items-center text-xl">
            <IoCash size={25} className="text-red-600" />
            <p className="text-center">{overAllExpenditure}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallInsights;

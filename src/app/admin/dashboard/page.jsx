"use client";
import { totalCalculateFn } from "@/app/utils/totalCalculateFn";
import AjsWahlaInsights from "@/components/charts/AjsWahlaInsights";
import BusinessTypeSalesByMonth from "@/components/charts/BusinessTypeSalesByMonth";
import DashboardNavbar from "@/components/charts/DashboardNavbar";
import ExpenditureByMonth from "@/components/charts/ExpenditureByMonth";
import ExpenditureByYear from "@/components/charts/ExpenditureByYear";
import OverallInsights from "@/components/charts/OverallInsights";
import OverallProfitByMonth from "@/components/charts/OverallProfitByMonth";
import OverallSalesByMonth from "@/components/charts/OverallSalesByMonth";
import PaymentModeWisePieChart from "@/components/charts/PaymentModeWisePieChart";
import RehomeFurnitureInsights from "@/components/charts/RehomeFurnitureInsights";
import RowHygieneInsights from "@/components/charts/RowHygieneInsights";
import Loader from "@/components/Loader";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [rehomeFurnitureData, setRehomeFurnitureData] = useState([]);
  const [rowHygieneData, setRowHygieneData] = useState([]);
  const [ajsWahlaData, setAjsWahlaData] = useState([]);
  const [expenditureData, setExpenditureData] = useState([]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  // Fetch All Details Function Trhough API
  async function fetchAllTransactions() {
    const salesResponse = await axios.get(
      "/api/salestransactions/getalltransactions"
    );

    const expenditureResponse = await axios.get(
      "/api/expenditure/getalltransaction"
    );
    setExpenditureData(expenditureResponse.data.data);

    const rehomeFurniture = salesResponse.data.data.filter(
      (trans) => trans.business_type === "rehome_furniture"
    );
    setRehomeFurnitureData(rehomeFurniture);

    const rowHygiene = salesResponse.data.data.filter(
      (trans) => trans.business_type === "row_hygiene"
    );
    setRowHygieneData(rowHygiene);
    const ajsWahla = salesResponse.data.data.filter(
      (trans) => trans.business_type === "ajs_wahla"
    );
    setAjsWahlaData(ajsWahla);
    return setTransactionData(salesResponse.data.data);
  }

  // Over All Sales Total
  const overAllPurchasePrice = Math.round(
    totalCalculateFn(transactionData, "total_purchase_price")
  );

  const overAllSellingPrice = Math.round(
    totalCalculateFn(transactionData, "total_selling_price")
  );

  // Total Expenditure
  const overAllExpenditure = Math.round(
    totalCalculateFn(expenditureData, "amount")
  );

  const overAllTotalProfit = Math.round(
    totalCalculateFn(transactionData, "total_profit")
  );

  // Net Profit (Profit - Expenditure)
  const netProfit = (overAllTotalProfit || 0) - (overAllExpenditure || 0);

  const overAllMargin = Math.round(
    (((overAllSellingPrice || 0) - (overAllPurchasePrice || 0)) /
      (overAllSellingPrice || 0)) *
      100
  );

  // Chart Data Calculations
  // Over All Sales By Month
  const overeAllSalesByMonthTemp = transactionData.reduce((acc, item) => {
    // Get month name only (e.g. "Jan", "Feb")
    const month = new Date(item.createdAt).toLocaleString("default", {
      month: "short",
    });
    // Sum total sales for that month
    acc[month] = (acc[month] || 0) + (item.total_selling_price || 0);
    return acc;
  }, {});
  // Over All Entries to Object
  const overeAllSalesByMonth = Object.entries(overeAllSalesByMonthTemp).map(
    ([month, total]) => ({
      month,
      total,
    })
  );

  // Expenditure By Month
  const expenditureByMonthTemp = expenditureData.reduce((acc, item) => {
    // Get month name only (e.g. "Jan", "Feb")
    const month = new Date(item.createdAt).toLocaleString("default", {
      month: "short",
    });
    // Sum total sales for that month
    acc[month] = (acc[month] || 0) + (item.amount || 0);
    return acc;
  }, {});
  // Over All Entries to Object
  const expenditureByMonth = Object.entries(expenditureByMonthTemp).map(
    ([month, total]) => ({
      month,
      total,
    })
  );

  // Expenditure By Year
  const expenditureByYearTemp = expenditureData.reduce((acc, item) => {
    // Get month name only (e.g. "Jan", "Feb")
    const year = new Date(item.createdAt).toLocaleString("default", {
      year: "numeric",
    });
    // Sum total sales for that month
    acc[year] = (acc[year] || 0) + (item.amount || 0);
    return acc;
  }, {});
  // Over All Entries to Object
  const expenditureByYear = Object.entries(expenditureByYearTemp).map(
    ([year, total]) => ({
      year,
      total,
    })
  );

  // Total Sales by Business Type
  const businessWiseSalesTemp = transactionData.reduce((acc, item) => {
    const month = new Date(item.createdAt).toLocaleString("default", {
      month: "short",
    });
    const type = item.business_type || "NA";

    if (!acc[month]) acc[month] = {};
    if (!acc[month][type]) acc[month][type] = 0;

    acc[month][type] += item.total_selling_price || 0;
    return acc;
  }, {});

  // Convert to table-like array
  const businessWiseSales = Object.entries(businessWiseSalesTemp).map(
    ([month, types]) => {
      const total = Object.values(types).reduce((sum, v) => sum + v, 0);
      return { month, ...types, total };
    }
  );

  // Total Sales by Payment Mode
  const paymentModeWiseSalesTemp = transactionData.reduce((acc, item) => {
    // Get Payment Mode
    const mode = item.payment_mode || "NA";
    // Sum total sales by Payment Mode
    acc[mode] = (acc[mode] || 0) + (item.total_selling_price || 0);
    return acc;
  }, {});
  // Over All Entries to Object
  const paymentModeWiseSales = Object.entries(paymentModeWiseSalesTemp).map(
    ([mode, total]) => ({
      mode,
      total,
    })
  );

  // Profit By Month
  const profitByMonthTemp = transactionData.reduce((acc, item) => {
    // Get month name only (e.g. "Jan", "Feb")
    const month = new Date(item.createdAt).toLocaleString("default", {
      month: "short",
    });
    // Sum total sales for that month
    acc[month] = (acc[month] || 0) + (item.total_profit || 0);
    return acc;
  }, {});
  // Over All Entries to Object
  const profitByMonth = Object.entries(profitByMonthTemp).map(
    ([month, total]) => ({
      month,
      total,
    })
  );
  return (
    <>
      {!transactionData.length > 0 && <Loader />}
      <div className="w-full bg-blue-600/30 overflow-auto">
        <DashboardNavbar />

        <div className="w-full px-4 md:px-6 py-4">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {rehomeFurnitureData.length > 0 && (
              <RehomeFurnitureInsights
                rehomeFurnitureData={rehomeFurnitureData}
              />
            )}
            {rowHygieneData.length > 0 && (
              <RowHygieneInsights rowHygieneData={rowHygieneData} />
            )}
            {rowHygieneData.length > 0 && (
              <AjsWahlaInsights ajsWahlaData={ajsWahlaData} />
            )}
            {transactionData.length > 0 && (
              <OverallInsights
                overAllPurchasePrice={overAllPurchasePrice}
                overAllSellingPrice={overAllSellingPrice}
                netProfit={netProfit}
                overAllExpenditure={overAllExpenditure}
              />
            )}
          </div>
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4 ">
            {overeAllSalesByMonth.length > 0 && (
              <OverallSalesByMonth
                overeAllSalesByMonth={overeAllSalesByMonth}
              />
            )}
            {expenditureByMonth.length > 0 && (
              <ExpenditureByMonth expenditureByMonth={expenditureByMonth} />
            )}
            {expenditureByYear.length > 0 && (
              <ExpenditureByYear expenditureByYear={expenditureByYear} />
            )}
            {businessWiseSales.length > 0 && (
              <BusinessTypeSalesByMonth businessWiseSales={businessWiseSales} />
            )}
            {profitByMonth.length > 0 && (
              <OverallProfitByMonth profitByMonth={profitByMonth} />
            )}
            {paymentModeWiseSales.length > 0 && (
              <PaymentModeWisePieChart
                paymentModeWiseSales={paymentModeWiseSales}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

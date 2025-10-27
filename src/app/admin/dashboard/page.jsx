"use client";
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
      (trans) => TransitionEvent.business_type === "rehome_furniture"
    );
    setRehomeFurnitureData(rehomeFurniture);

    const rowHygiene = salesResponse.data.data.filter(
      (trans) => TransitionEvent.business_type === "row_hygiene"
    );
    setRowHygieneData(rowHygiene);
    const ajsWahla = salesResponse.data.data.filter(
      (trans) => TransitionEvent.business_type === "ajs_wahla"
    );
    setAjsWahlaData(ajsWahla);
    return setTransactionData(salesResponse.data.data);
  }

  // transactionData.map((item) => {
  //   const data = new Date(item.createdAt).toLocaleString("default", {
  //     day: "numeric",
  //     month: "short",
  //     year: "numeric",
  //   });
  //   console.log(data);
  // });

  // Total Calculation Function
  function totalCalculateFn(aray, columnName) {
    const total = aray.reduce(
      (acc, value) => (Number(acc) || 0) + Number(value[columnName] || 0),
      0
    );
    return total;
  }

  // Over All Sales Total
  const overAllPurchasePrice = Math.round(
    totalCalculateFn(transactionData, "total_purchase_price")
  );

  const overAllSellingPrice = Math.round(
    totalCalculateFn(transactionData, "total_selling_price")
  );

  const overAllTotalProfit = Math.round(
    totalCalculateFn(transactionData, "total_profit")
  );

  // Net Profit (Profit - Expenditure)
  const netProfit = (overAllTotalProfit || 0) - (expenditureData || 0);

  const overAllMargin = Math.round(
    (((overAllSellingPrice || 0) - (overAllPurchasePrice || 0)) /
      (overAllSellingPrice || 0)) *
      100
  );

  // Rehome Furniture Sales Total
  const RFPurchasePrice = Math.round(
    totalCalculateFn(rehomeFurnitureData, "total_purchase_price")
  );

  const RFSellingPrice = Math.round(
    totalCalculateFn(rehomeFurnitureData, "total_selling_price")
  );

  const RFTotalProfit = Math.round(
    totalCalculateFn(rehomeFurnitureData, "total_profit")
  );

  const RFMargin = Math.round(
    (((RFSellingPrice || 0) - (RFPurchasePrice || 0)) / (RFSellingPrice || 0)) *
      100
  );

  // Row Hygiene Sales Total
  const RHPurchasePrice = Math.round(
    totalCalculateFn(rowHygieneData, "total_purchase_price")
  );

  const RHSellingPrice = Math.round(
    totalCalculateFn(rowHygieneData, "total_selling_price")
  );

  const RHTotalProfit = Math.round(
    totalCalculateFn(rowHygieneData, "total_profit")
  );

  const RHMargin = Math.round(
    (((RHSellingPrice || 0) - (RHPurchasePrice || 0)) / (RHSellingPrice || 0)) *
      100
  );

  // Ajs Wahla Sales Total
  const AWPurchasePrice = Math.round(
    totalCalculateFn(ajsWahlaData, "total_purchase_price")
  );

  const AWSellingPrice = Math.round(
    totalCalculateFn(ajsWahlaData, "total_selling_price")
  );

  const AWTotalProfit = Math.round(
    totalCalculateFn(ajsWahlaData, "total_profit")
  );

  const AWMargin = Math.round(
    (((AWSellingPrice || 0) - (AWPurchasePrice || 0)) / (AWSellingPrice || 0)) *
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
// Starts from Here 24.10.2025
  const expenditureByYear = "a";
  const businessWiseSales = "a";
  const paymentModeWiseSales = "a";
  const profitByMonth = "a";

  return (
    <div>
      <h2>{overAllPurchasePrice}</h2>
      <h2>{overAllSellingPrice}</h2>
      <h2>{overAllTotalProfit}</h2>
      <h2>{overAllMargin}%</h2>
      <button className="px-4 py-2 bg-red-600 text-white">Calculate</button>
    </div>
  );
};

export default Dashboard;

"use client";
import BusinessTypeSalesByMonth from "@/components/charts/BusinessTypeSalesByMonth";
import ExpenditureByMonth from "@/components/charts/ExpenditureByMonth";
import ExpenditureByYear from "@/components/charts/ExpenditureByYear";
import OverallProfitByMonth from "@/components/charts/OverallProfitByMonth";
import OverallSalesByMonth from "@/components/charts/OverallSalesByMonth";
import PaymentModeWisePieChart from "@/components/charts/PaymentModeWisePieChart";
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
    <div className="grid grid-cols-1 md:grid-cols-2 ld:grid-cols-3 gap-2 px-4 md:p-10 bg-[#dfdfdf]">
      {overeAllSalesByMonth.length > 0 && (
        <OverallSalesByMonth overeAllSalesByMonth={overeAllSalesByMonth} />
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
        <PaymentModeWisePieChart paymentModeWiseSales={paymentModeWiseSales} />
      )}
    </div>
  );
};

export default Dashboard;

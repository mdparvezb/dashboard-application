"use client";
import { sortByMonthFn } from "@/app/utils/sortByMonthFn";
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
  const [filteredSalesData, setFilteredSalesData] = useState(transactionData);
  const [fitleredExpenditureData, setFitleredExpenditureData] =
    useState(filteredSalesData);

  const monthOrder = [
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

  // Filters ********************************************

  const allMonthsSales = Array.from(
    new Set(
      transactionData.map((date) =>
        new Date(date.sales_date).toLocaleString("default", { month: "short" })
      )
    )
  );
  const allMonthsExpenditure = Array.from(
    new Set(
      expenditureData.map((date) =>
        new Date(date.expense_date).toLocaleString("default", {
          month: "short",
        })
      )
    )
  );
  // Unique Months from Transactions and Expenditure
  const allMonths = [
    ...new Set([...allMonthsSales, ...allMonthsExpenditure]),
  ].sort((a, b) => monthOrder.indexOf(b) - monthOrder.indexOf(a));

  const allYearsSales = Array.from(
    new Set(
      transactionData.map((date) => new Date(date.sales_date).getFullYear())
    )
  );
  const allYearsExpenditure = Array.from(
    new Set(
      expenditureData.map((date) => new Date(date.expense_date).getFullYear())
    )
  );

  const allYears = [
    ...new Set([...allYearsSales, ...allYearsExpenditure]),
  ].sort((a, b) => b - a); // sort years descending

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    if (!selectedMonth || !selectedYear) {
      setFilteredSalesData(transactionData);
      setFitleredExpenditureData(expenditureData);
    }
  }, [transactionData, expenditureData, selectedMonth, selectedYear]);

  useEffect(() => {
    const filteredSales = transactionData.filter(
      (item) =>
        (!selectedMonth ||
          new Date(item.sales_date).toLocaleString("default", {
            month: "short",
          }) === selectedMonth) &&
        (!selectedYear ||
          new Date(item.sales_date).getFullYear() === parseInt(selectedYear))
    );
    const filteredExpenditure = expenditureData.filter(
      (item) =>
        (!selectedMonth ||
          new Date(item.expense_date).toLocaleString("default", {
            month: "short",
          }) === selectedMonth) &&
        (!selectedYear ||
          new Date(item.expense_date).getFullYear() === parseInt(selectedYear))
    );

    setFilteredSalesData(filteredSales);
    setFitleredExpenditureData(filteredExpenditure);
    const rf = filteredSales.filter(
      (trans) => trans.business_type === "rehome_furniture"
    );
    setRehomeFurnitureData(rf);

    const rh = filteredSales.filter(
      (trans) => trans.business_type === "row_hygiene"
    );
    setRowHygieneData(rh);
    const ajs = filteredSales.filter(
      (trans) => trans.business_type === "ajs_wahla"
    );
    setAjsWahlaData(ajs);
  }, [selectedMonth, selectedYear]);

  // ********************************************

  // Chart Data Calculations
  // Over All Sales By Month
  const overAllSalesByMonthTemp = filteredSalesData.reduce((acc, item) => {
    // Get month name only (e.g. "Jan", "Feb")
    const month = new Date(item.sales_date).toLocaleString("default", {
      month: "short",
    });
    // Sum total sales for that month
    acc[month] = (acc[month] || 0) + (item.total_selling_price || 0);
    return acc;
  }, {});
  // Over All Entries to Object
  const overAllSalesByMonthTempo = Object.entries(overAllSalesByMonthTemp).map(
    ([month, total]) => ({
      month,
      total,
    })
  );
  // Sorting
  const overAllSalesByMonth = sortByMonthFn(overAllSalesByMonthTempo, "month");

  // Expenditure By Month
  const expenditureByMonthTemp = fitleredExpenditureData.reduce((acc, item) => {
    // Get month name only (e.g. "Jan", "Feb")
    const month = new Date(item.expense_date).toLocaleString("default", {
      month: "short",
    });
    // Sum total sales for that month
    acc[month] = (acc[month] || 0) + (item.amount || 0);
    return acc;
  }, {});
  // Over All Entries to Object
  const expenditureByMonthTempo = Object.entries(expenditureByMonthTemp).map(
    ([month, total]) => ({
      month,
      total,
    })
  );
  // Sorting
  const expenditureByMonth = sortByMonthFn(expenditureByMonthTempo, "month");

  // Expenditure By Year
  const expenditureByYearTemp = fitleredExpenditureData.reduce((acc, item) => {
    // Get month name only (e.g. "Jan", "Feb")
    const year = new Date(item.expense_date).toLocaleString("default", {
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
  const businessWiseSalesTemp = filteredSalesData.reduce((acc, item) => {
    const month = new Date(item.sales_date).toLocaleString("default", {
      month: "short",
    });
    const type = item.business_type || "NA";

    if (!acc[month]) acc[month] = {};
    if (!acc[month][type]) acc[month][type] = 0;

    acc[month][type] += item.total_selling_price || 0;
    return acc;
  }, {});

  // Convert to table-like array
  const businessWiseSalesTempo = Object.entries(businessWiseSalesTemp).map(
    ([month, types]) => {
      const total = Object.values(types).reduce((sum, v) => sum + v, 0);
      return { month, ...types, total };
    }
  );
  const businessWiseSales = sortByMonthFn(businessWiseSalesTempo, "month");

  // Total Sales by Payment Mode
  const paymentModeWiseSalesTemp = filteredSalesData.reduce((acc, item) => {
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
  const profitByMonthTemp = filteredSalesData.reduce((acc, item) => {
    // Get month name only (e.g. "Jan", "Feb")
    const month = new Date(item.sales_date).toLocaleString("default", {
      month: "short",
    });
    // Sum total sales for that month
    acc[month] = (acc[month] || 0) + (item.total_profit || 0);
    return acc;
  }, {});
  // Over All Entries to Object
  const profitByMonthTempo = Object.entries(profitByMonthTemp).map(
    ([month, total]) => ({
      month,
      total,
    })
  );
  // Sorting
  const profitByMonth = sortByMonthFn(profitByMonthTempo, "month");

  return (
    <>
      {!transactionData.length > 0 && <Loader />}
      <div className="w-full bg-blue-600/30 overflow-auto">
        <DashboardNavbar />
        {/* Filters */}
        <div className="w-full mt-4 grid grid-cols-2 gap-4 items-center px-4 md:px-6">
          <div className="text-sm md:text-xl flex gap-2 md:gap-5 justify-center py-2 bg-blue-700 text-white shadow-md rounded">
            <label className="font-semibold">Month</label>
            <select
              className="cursor-pointer focus:outline-none"
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option className="text-black" value="">
                All Months
              </option>
              {allMonths.map((month) => (
                <option className="text-black" key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="text-sm md:text-xl flex gap-2 md:gap-5 justify-center py-2 bg-blue-700 text-white shadow-md rounded">
            <label className="font-semibold">Year</label>
            <select
              className="cursor-pointer focus:outline-none"
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option className="text-black" value="">
                All Years
              </option>
              {allYears.map((year) => (
                <option className="text-black" key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
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
            {ajsWahlaData.length > 0 && (
              <AjsWahlaInsights ajsWahlaData={ajsWahlaData} />
            )}
            {(transactionData.length > 0 || expenditureData.length > 0) && (
              <OverallInsights
                filteredSalesData={filteredSalesData}
                fitleredExpenditureData={fitleredExpenditureData}
              />
            )}
          </div>
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4 ">
            {overAllSalesByMonth.length > 0 && (
              <OverallSalesByMonth overAllSalesByMonth={overAllSalesByMonth} />
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

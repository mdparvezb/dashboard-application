"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const Test = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("/api/getdata");
    return setData(response.data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Total Sales
  const totalSales = data.reduce(
    (accu, item) => Number(accu) + Number(item.TotalSalesPrice || 0),
    0
  );
  console.log(totalSales);

  // PaymentWise
  const paymentWise = data.reduce((acc, item) => {
    const mode = item.PaymentMode || "Unknown"; // handle missing modes
    acc[mode] = (acc[mode] || 0) + (item.TotalSalesPrice || 0);
    return acc;
  }, {});

  const PieChart = Object.entries(paymentWise).map(([paymentMode, total]) => ({
    name: paymentMode,
    value: total,
  }));
  console.log(PieChart);

  const monthWiseData = data.reduce((acc, item) => {
    const month = new Date(item.Date).toLocaleString("default", {
      month: "short",
    });
    //  Sum Total Sales for the Month
    acc[month] = (acc[month] || 0) + (item.TotalSalesPrice || 0);
    return acc;
  }, {});
  console.log(monthWiseData);

  return (
    <div>
      <h2 className="text-center text-2xl font-bold text-white bg-blue-600">
        Sample Charts
      </h2>
      {/* {data.map((item) => (
        <li key={item._id}>{item.TotalSalesPrice}</li>
      ))} */}
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        height={300}
      />
    </div>
  );
};

export default Test;

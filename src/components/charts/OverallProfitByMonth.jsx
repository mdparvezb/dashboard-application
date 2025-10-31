import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const OverallProfitByMonth = ({ profitByMonth }) => {
  return (
    <div className="w-full rounded-md px-2 py-1 flex flex-col items-center bg-white/80 shadow-md">
      <h2 className="text-center font-semibold text-md">
        Overall Profit By Month
      </h2>
      <LineChart
        style={{ width: "100%", aspectRatio: 1.618, maxWidth: 600 }}
        responsive
        data={profitByMonth}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        {/* <CartesianGrid stroke="#aaa" strokeDasharray="5 5" /> */}
        <Line
          type="monotone"
          dataKey="total"
          stroke="green"
          strokeWidth={2}
          name="Overall Profit By Month"
        />
        <XAxis dataKey="month" />
        <YAxis
          width="auto"
          // label={{ value: "Total Sales", position: "insideLeft", angle: -90 }}
        />
        <Legend align="center" />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default OverallProfitByMonth;

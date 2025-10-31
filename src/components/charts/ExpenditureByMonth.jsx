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

const ExpenditureByMonth = ({ expenditureByMonth }) => {
  return (
    <div className="w-full rounded-md px-2 py-1 flex flex-col items-center bg-white/80 shadow-md">
      <h2 className="text-center font-semibold text-md">Total Expenditure By Month</h2>
      <LineChart
        style={{ width: "100%", aspectRatio: 1.618, maxWidth: 600 }}
        responsive
        data={expenditureByMonth}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        {/* <CartesianGrid stroke="#aaa" strokeDasharray="5 5" /> */}
        <Line
          type="monotone"
          dataKey="total"
          stroke="red"
          strokeWidth={2}
          name="Expenditure By Month"
        />
        <XAxis dataKey="month" />
        <YAxis
          width="auto"
          // label={{
          //   value: "Total Expenditure",
          //   position: "insideLeft",
          //   angle: -90,
          // }}
        />
        <Legend align="center" />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default ExpenditureByMonth;

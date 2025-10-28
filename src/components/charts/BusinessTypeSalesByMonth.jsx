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

const BusinessTypeSalesByMonth = ({ businessWiseSales }) => {
  return (
    <div className="w-full">
      <h2>Buniness Wise Sales Data By Month</h2>
      <LineChart
        style={{ width: "100%", aspectRatio: 1.618, maxWidth: 600 }}
        responsive
        data={businessWiseSales}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="ajs_wahla" stroke="green" />
        <Line type="monotone" dataKey="rehome_furniture" stroke="purple" />
        <Line type="monotone" dataKey="row_hygiene" stroke="orange" />
        <XAxis dataKey="month" />
        <YAxis
          width="auto"
          label={{ value: "Total Sales", position: "insideLeft", angle: -90 }}
        />
        <Legend align="center" />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default BusinessTypeSalesByMonth;

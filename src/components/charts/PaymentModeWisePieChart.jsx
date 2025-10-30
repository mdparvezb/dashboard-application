import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PaymentModeWisePieChart = ({ paymentModeWiseSales }) => {
  const COLORS = ["blue", "green"];
  return (
    <div className="w-full rounded-md px-2 py-1 flex flex-col items-center bg-white shadow-md">
      <h2 className="text-center font-semibold text-md">Payment Mode Wise</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={paymentModeWiseSales}
            dataKey="total"
            nameKey="mode"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {paymentModeWiseSales.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentModeWisePieChart;

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
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div className="w-full">
      <h2>Payment Mode Wise</h2>
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

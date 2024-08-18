// src/components/ExpenseChart.tsx
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartLegend } from "@/components/ui/chart";

const chartData = [
  { category: "Food", amount: 120 },
  { category: "Utilities", amount: 90 },
  { category: "Rent", amount: 500 },
  { category: "Entertainment", amount: 150 },
  // Data lainnya
];

const chartConfig = {
  amount: {
    label: "Amount",
    color: "#4caf50",
  },
} satisfies ChartConfig;

export function ExpenseChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <ChartTooltip />
        <ChartLegend />
        <Bar dataKey="amount" fill={chartConfig.amount.color} />
      </BarChart>
    </ChartContainer>
  );
}

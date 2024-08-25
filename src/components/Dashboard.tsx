"use client";

import React, {useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useExpenseDaily } from "@/hooks/useExpenseDaily";
import Cookies from "js-cookie";
import ExpenseCard from "./CardExpenseDaily";
import { TesChart } from "./TesChart";
import { DataTable } from "../components/DataExpense";
import { Button } from "./ui/button";
import Link from "next/link";

interface MonthlyData {
  date: string;
  _sum: {
    amount: number;
  };
}

const chartConfig = {
  income: {
    label: "Pendapatan",
    color: "hsl(var(--chart-1))",
  },
  expense: {
    label: "Pengeluaran",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Dashboard() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");

  const userId = Cookies.get("userId");
  console.log("userId", userId);

  const { data: expenseDaily = [], isLoading: isLoadingExpenseDaily, error: errorExpenseDaily } = useExpenseDaily();
  console.log("expenseDaily", expenseDaily, "error", errorExpenseDaily);
  const { data, isLoading, error } = useDashboardData({ startDate, endDate, category });

  const expenseData = expenseDaily.map((dailyExpense) => ({
    id: dailyExpense.id,
    amount: dailyExpense.amount,
    category: dailyExpense.category.name,
    date: dailyExpense.date,
  }));

  const chartData = data?.monthlyIncome.map((income: MonthlyData, index: number) => ({
    month: new Date(income.date).toLocaleDateString("id-ID", { month: "short", year: "numeric" }),
    income: income._sum.amount || 0,
    expense: data?.monthlyExpense[index]?._sum.amount || 0,
  }));

  const totalPendapatan = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(data?.totalIncome || 0);

  const totalPengeluaran = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(data?.totalExpense || 0);

  const sisaAnggaran = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(data?.remainingBudget || 0);

  if (isLoading || isLoadingExpenseDaily) {
    return <div className="w-full h-screen flex justify-center items-center">
      <p>Loading...</p>
    </div>;
  }

  if (error || errorExpenseDaily) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Pendapatan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalPendapatan}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Pengeluaran</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalPengeluaran}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sisa Anggaran</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{sisaAnggaran}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline"> 
              <Link href="dashboard/expenses">Add Expense</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex w-full gap-x-4">
        <Card className="w-1/2 h-auto">
          <CardHeader>
            <CardTitle>Pendapatan vs Pengeluaran</CardTitle>
            <CardDescription>Perbandingan bulanan</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                  <YAxis />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                  <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                  <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="w-1/2 p-3">
          <DataTable data={expenseData} />
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;

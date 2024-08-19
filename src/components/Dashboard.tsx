"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useDashboardData } from "@/hooks/useDashboardData";

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
  const { data, isLoading, error } = useDashboardData();

  console.log("data", data);

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    return <p>Error: {error.message}</p>;
  }

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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
      </div>
      <Card>
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
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Tren naik 5.2% bulan ini <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">Menampilkan pendapatan dan pengeluaran bulanan</div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Dashboard;

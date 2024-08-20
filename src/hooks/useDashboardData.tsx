// src/hooks/useDashboardData.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

interface MonthlyData {
  date: string;
  _sum: {
    amount: number;
  };
}

interface DashboardData {
  totalIncome: number;
  totalExpense: number;
  remainingBudget: number;
  monthlyIncome: MonthlyData[];
  monthlyExpense: MonthlyData[];
}

export const useDashboardData = (filters: { startDate?: string; endDate?: string; category?: string }) => {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");

  return useQuery<DashboardData>({
    queryKey: ["dashboardData", userId, filters],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID tidak tersedia.");
      }
      const response = await axios.get(`http://localhost:3333/api/dashboard/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: filters,
      });
      return response.data;
    },
    enabled: !!userId, // Pastikan query hanya dijalankan jika userId tersedia
  });
};

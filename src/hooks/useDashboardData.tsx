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

export const useDashboardData = () => {
  // Ambil token dari cookie
  const token = Cookies.get("token");

  // Ambil userId dari cookie
  const userId = Cookies.get("userId");
  console.log("userId", userId);

  return useQuery<DashboardData>({
    queryKey: ["dashboardData", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID tidak tersedia.");
      }
      const response = await axios.get(`http://localhost:3333/api/dashboard/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("ini condsole.log",response.data);
      return response.data;
    },
    enabled: !!userId, // Pastikan query hanya dijalankan jika userId tersedia
  });
};

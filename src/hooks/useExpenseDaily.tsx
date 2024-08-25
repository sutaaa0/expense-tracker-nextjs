import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useExpenseDaily = () => {

  interface ExpenseDaily {
    id: string;
    userId: string;
    categoryId: string;
    amount: number;
    description: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    category: {
      id: string;
      name: string;
      description: string;
    };
  }

  const token = Cookies.get("token");
  const userId = Cookies.get("userId");

  return useQuery<ExpenseDaily[]>({
    queryKey: ["expenseDaily"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3333/api/expenses/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("ini data daily : ", response.data);
      return response.data; // Pastikan ini adalah array dari ExpenseDaily
    },
  });
};

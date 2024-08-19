// types/dashboard.ts
export interface DashboardData {
    totalIncome: number;
    totalExpense: number;
    remainingBudget: number;
    monthlyIncome: Array<{
      date: string;
      _sum: {
        amount: number;
      };
    }>;
    monthlyExpense: Array<{
      date: string;
      _sum: {
        amount: number;
      };
    }>;
  }
  
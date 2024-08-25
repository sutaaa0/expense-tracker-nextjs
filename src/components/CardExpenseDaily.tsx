// components/ExpenseCard.tsx

import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, } from '../components/ui/card';

interface ExpenseCardProps {
  amount: number;
  description: string;
  date: string;
  category: {
    name: string;
  };
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({
  amount,
  description,
  date,
  category
}) => {
  // Format the date
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <Card className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
      <CardHeader>
        <p  className="text-gray-800 font-semibold">
          {category.name}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <p  className="text-gray-700">
            <strong>Description:</strong> {description}
          </p>
          <p  className="text-gray-700">
            <strong>Amount:</strong> ${amount}
          </p>
          <p  className="text-gray-700">
            <strong>Date:</strong> {formattedDate}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;

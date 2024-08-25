"use client";

import Navbar from '@/components/Navbar'
import React, { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Chart } from '@/components/Chart'
import { DataTable } from '@/components/DataExpense';
import { useExpenseDaily } from '@/hooks/useExpenseDaily';
import { SelectScrollable } from '@/components/SelectScroll';
import { Button } from '@/components/ui/button';
import { ArrowDownRight, ArrowUpRight, MoveDownLeft, Plus, TrendingDown, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function Page() {
  const [select, setSelect] = useState('daily')

  // Handler function for Select changes
  const handleSelectChange = (value: any) => {
    setSelect(value);
    console.log(value)
  };

  const { data: expenseDaily = [], isLoading: isLoadingExpenseDaily, error: errorExpenseDaily } = useExpenseDaily();

  const expenseData = expenseDaily.map((dailyExpense) => ({
    id: dailyExpense.id,
    amount: dailyExpense.amount,
    category: dailyExpense.category.name,
    date: dailyExpense.date,
  }));

  return (
    <div className='relative py-12 w-full flex justify-center items-center md:px-60'>
      <Navbar />
      <div className='w-full h-auto md:mt-48'>

        <div className='w-full flex justify-between items-center'>

          <div>
            <h1 className='font-bold text-xl md:text-3xl'>Summary</h1>
          </div>

          <div>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

        </div>

        <div className='w-full flex h-auto mt-12 justify-between items-center'>

          <div className='flex flex-col gap-y-2'>
            <p className='font-bold text-md'>Net Total</p>
            <div className='flex'>
              <h2 className='font-bold text-2xl'>Rp.340.000.00</h2>
              <p className='text-sm text-gray-500'>+12.5% from last month</p>
            </div>
          </div>

          <div className='w-1/2'>
            <Chart selector={select} />
          </div>
        </div>

        <div className='w-full flex justify-center itesm-center mt-12 gap-x-16'>
          <div className='w-[300px] h-[200px] flex flex-col justify-center items-start gap-y-3'>
            <div className='flex flex-col'>
              <p className='text-green-600 text-lg'>Icome</p>
              <p className='font-bold text-xl'>Rp.5.000.000.00</p>
            </div>
            <p className='text-gray-600'>+12.5% vs last month</p>
          </div>
          <div className='w-[300px] h-[200px] flex flex-col justify-center items-start gap-y-3'>
            <div className='flex flex-col w-[200px]'>
              <div className='flex justify-between items-center text-red-600 text-lg'>
                <p>Expenses</p>
                <p>42%</p>
              </div>
              <p className='font-bold text-xl'>Rp.3.540.000.00</p>
            </div>
            <p className='text-gray-600'>+2.5% vs last month</p>
          </div>
          <div className='w-[300px] h-[200px] flex flex-col justify-center items-start gap-y-3'>
            <div className='flex flex-col'>
              <div className='flex justify-between items-center text-violet-600 text-lg'>
                <p>Investment</p>
                <p>34%</p>
              </div>
              <p className='font-bold text-xl'>Rp.1.000.000.00</p>
            </div>
            <p className='text-gray-600'>+16% vs last month</p>
          </div>
          <div className='w-[300px] h-[200px] flex flex-col justify-center items-start gap-y-3 '>
            <div className='flex flex-col'>
              <div className='flex justify-between items-center text-yellow-500 text-lg'>
                <p>Savings</p>
                <p>9%</p>
              </div>
              <p className='font-bold text-xl'>Rp.500.000.00</p>
            </div>
            <p className='text-gray-600'>+7.8% vs last month</p>
          </div>
        </div>

        <div className='w-full flex flex-col  justify-center items-center h-auto mt-12'>

          <div className='w-full flex justify-between items-end'>
            <div className='flex flex-col'>
              <h1 className='font-bold text-xl md:text-3xl'>Transactions</h1>
              <p className='text-gray-600'>You had 2 incomes and 17 expenses this month</p>
            </div>
            <div className='flex gap-x-3'>
              <SelectScrollable />
              <Button variant="outline" className='bg-black text-white'>
                <Plus className="mr-2 h-4 w-4" />
                <Link href="/dashboard/expenses">Add Expense</Link>
              </Button></div>
          </div>

          <div className='w-full flex flex-col py-2 mt-12'>
            <div className='flex justify-between items-center border-b border-gray-200 pb-2'>
              <div className='text-gray-600'>
                <p>Today</p>
              </div>

              <div>
                <p className='text-gray-600'>Rp.340.000.00</p>
              </div>
            </div>
            <div className='flex justify-between items-center border-b border-gray-200 pb-2'>
              <div className='flex gap-x-2'>
                <TrendingDown color="#c10606" className='font-bold' />
                <p>Netflix</p>
              </div>
              <div>
                <Badge variant={"outline"} className='text-base my-2'>🍿 Streaming</Badge>
              </div>
              <div>
                <div>
                  <p className='text-gray-600'>23-04-2023</p>
                </div>
              </div>
              <div>
                <p>Rp.340.000.00</p>
              </div>
            </div>
            <div className='flex justify-between items-center border-b border-gray-200 py-6 pb-2'>
              <div className='text-gray-600'>
                <p>Yesterday</p>
              </div>

              <div>
                <p className='text-gray-600'>Rp.340.000.00</p>
              </div>
            </div>
            <div className='flex justify-between items-center border-b border-gray-200 pb-2'>
              <div className='flex gap-x-2'>
                <TrendingDown color="#c10606" className='font-bold' />
                <p>Food</p>
              </div>
              <div>
                <Badge variant={"outline"} className='text-base my-2'>🛒 Groceries</Badge>
              </div>
              <div>
                <div>
                  <p className='text-gray-600'>23-04-2023</p>
                </div>
              </div>
              <div>
                <p>Rp.340.000.00</p>
              </div>
            </div>
            <div className='flex justify-between items-center border-b border-gray-200 pb-2'>
              <div className='flex gap-x-2'>
                <TrendingDown color="#c10606" className='font-bold' />
                <p>Car Payment</p>
              </div>
              <div>
                <Badge variant={"outline"} className='text-base my-2'>🚕 Car</Badge>
              </div>
              <div>
                <div>
                  <p className='text-gray-600'>23-04-2023</p>
                </div>
              </div>
              <div>
                <p>Rp.340.000.00</p>
              </div>
            </div>
            <div className='flex justify-between items-center border-b border-gray-200 pb-2'>
              <div className='flex gap-x-2'>
                <TrendingUp color="#2a9d8f" className='font-bold' />
                <p>Salary</p>
              </div>
              <div>
                <Badge variant={"outline"} className='text-base my-2'>💰 Salary</Badge>
              </div>
              <div>
                <div>
                  <p className='text-gray-600'>23-04-2023</p>
                </div>
              </div>
              <div>
                <p>Rp.340.000.00</p>
              </div>
            </div>
            <div className='mt-12 flex justify-center items-center'>
              <Button variant={"ghost"} className='hover:bg-transparent text-base'>load more</Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

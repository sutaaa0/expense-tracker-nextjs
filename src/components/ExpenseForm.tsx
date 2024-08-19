"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ExpenseFormData {
  amount: number;
  categoryId: string;
  description: string;
  date: string;
  userId: string;
}

export function ExpenseForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ExpenseFormData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const onSubmit = async (data: ExpenseFormData) => {
    setLoading(true);
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    console.log("userId", userId);  
    console.log("token", token);
    console.log(data);

  
    try {
      const formattedDate = new Date(data.date).toISOString();
      const response = await axios.post(
        "http://localhost:3333/api/expenses",
        {
        "amount": parseFloat(data.amount.toString()),
        "categoryId": data.categoryId, 
        "description": data.description,
        "userId": userId,
        "date": formattedDate
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }


      );
      console.log("response:", response);
      console.log("response:", response.status);

      if (response.status === 201) {
        router.refresh();
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting expense:", error);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input id="amount" type="number" {...register("amount", { required: "Amount is required" })} />
        {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
      </div>

      <div>
        <Label htmlFor="categoryId">Category</Label>
        {isLoadingCategories ? (
          <p>Loading categories...</p>
        ) : (
          <Select onValueChange={(value) => setValue("categoryId", value)}>
            <SelectTrigger id="categoryId" {...register("categoryId", { required: "Category is required" })}>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category: { id: string; name: string }) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" type="text" {...register("description")} />
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" {...register("date", { required: "Date is required" })} />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Expense"}
      </Button>
    </form>
  );
}

export default ExpenseForm;

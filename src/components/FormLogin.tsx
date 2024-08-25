"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookie from "js-cookie";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// Schema validasi menggunakan Zod
const LoginSchema = z.object({
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  password: z.string().min(6, {
    message: "Password harus memiliki setidaknya 6 karakter.",
  }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Fungsi untuk menangani submit form
  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    try {
      setLoading(true);
      const result = await axios.post("http://localhost:3333/api/auth/login", data);
      console.log("result", result);
      if (result.status === 200) {
        // Simpan token ke localStorage
        Cookie.set("token", result.data.token, { expires: 7 });
        Cookie.set("userId", result.data.user.id, { expires: 7 });
        Cookie.set("name", result.data.user.name, { expires: 7 });
        Cookie.set("email", result.data.user.email, { expires: 7 });

        toast({
          title: "Success!",
          description: "Login Berhasil!",
        });

        window.location.href = "/dashboard";
        setLoading(false);
      }
    } catch (error: any) {
      toast({
        title: "Login Gagal",
        description: error.response?.data?.error || "Terjadi kesalahan saat login.",
        variant: "destructive",
      });
    }
    
    setTimeout(() => {
      setLoading(false);
    }, 600);

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="flex justify-between items-center relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Password" {...field} />
                  <div className="absolute right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-between">
          <Button type="submit">{loading ? "Loading..." : "Login"}</Button>

          <Link href="/auth/register">
            <p className="text-sm text-gray-500 underline hover:text-gray-600 transition-all">Don&apos;t have an account?</p>
          </Link>
        </div>
      </form>
    </Form>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// Schema validasi menggunakan Zod
const RegisterSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus memiliki setidaknya 2 karakter.",
  }),
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  password: z.string().min(6, {
    message: "Password harus memiliki setidaknya 6 karakter.",
  }),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Fungsi untuk menangani submit form
  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3333/api/auth/register", data);
      if (response.status == 201) {
        toast({
          title: "Registrasi Berhasil",
          description: "Registrasi Berhasil",
        });
        
        form.reset();
        window.location.href = "/auth/login";
      } else {
        // Handle unexpected statuses
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error: any) {
      console.error("Error during registration:", error); // Tambahkan log untuk melihat errornya
      toast({
        title: "Registrasi Gagal",
        description: error.response?.data?.error || "Terjadi kesalahan saat registrasi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Harus selalu dipanggil, meskipun terjadi error
      console.log("Loading state reset to false");
    }
  }
  
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="Nama Lengkap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          <Button type="submit">{loading ? "Loading..." : "Register"}</Button>
          <Link href="/auth/login">
            <p className="text-sm text-gray-500 underline hover:text-gray-600 transition-all">Already have an account?</p>
          </Link>
        </div>
      </form>
    </Form>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

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

  // Fungsi untuk menangani submit form
  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    try {
      const response = await axios.post("http://localhost:3333/api/auth/register", data);
      if (response.status == 201) {
        toast({
          title: "Registrasi Berhasil",
          description: "Registrasi Berhasil",
        });
      }
      form.reset();
    } catch (error: any) {
      toast({
        title: "Registrasi Gagal",
        description: error.response?.data?.error || "Terjadi kesalahan saat registrasi.",
        variant: "destructive",
      });
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
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
}

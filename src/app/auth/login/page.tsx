import { LoginForm } from "@/components/FormLogin";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="font-bold text-3xl text-center">Login</h1>
      <div className=" flex justify-center items-center mt-12 max-w-2xl w-full">
        <LoginForm />
      </div>
    </div>
  );
}

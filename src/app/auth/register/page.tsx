"use client";
import { RegisterForm } from "@/components/FormRegister";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="font-bold text-3xl text-center">Register</h1>
      <div className=" flex justify-center items-center mt-12 max-w-2xl w-full">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;

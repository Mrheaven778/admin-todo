"use client";
import React from "react";
import { useForm } from "react-hook-form";

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <form action="" className="bg-bgAuthCard p-8 rounded-3xl shadow-md w-96">
        <h1 className="mb-6 text-3xl font-bold">Olvidaste tu contraseña</h1>
        <div className="mb-4">
          <label htmlFor="email" className="text-lg mb-2 block">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-bgAuthCard"
            placeholder="usuario@gmail.com"
          />
        </div>
      </form>
    </div>
  );
}

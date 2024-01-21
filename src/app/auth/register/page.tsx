"use client";
import { createUserFrom } from "@/auth/actions/auth-actions";
import CreateFrom from "@/auth/components/CreateFrom";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [errorPasswornd, setErrorPasswornd] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    const { name, email, password, confirmPassword, error } = data;
    if (password !== confirmPassword) {
      setErrorPasswornd(true);
      return;
    }
    
    await createUserFrom(name, email, password);
    router.push("/auth/login");
  });
  return (
    // <div className="h-screen flex items-center justify-center">
    //   <form
    //     method="post"
    //     className="bg-bgAuthCard p-8 rounded-3xl shadow-md w-96"
    //     onSubmit={onSubmit}
    //   >
    //     <h1 className="mb-6 text-3xl font-bold ">Crear Cuenta</h1>
    //     <div className="mb-4">
    //       <label htmlFor="user" className="text-lg mb-2 block">
    //         Nombre de Usuario
    //       </label>
    //       <input
    //         id="user"
    //         type="text"
    //         {...register("user", { required: true })}
    //         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-bgAuthCard"
    //         placeholder="usuario"
    //       />
    //       {errors.user && (
    //         <span className="text-red-500">Este campo es requerido</span>
    //       )}
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="email" className=" text-lg mb-2 block">
    //         Email
    //       </label>
    //       <input
    //         id="email"
    //         type="email"
    //         {...register("email", { required: true })}
    //         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-bgAuthCard"
    //         placeholder="usuario@gmail.com"
    //       />
    //       {errors.email && (
    //         <span className="text-red-500">Este campo es requerido</span>
    //       )}
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="password" className=" text-lg mb-2 block">
    //         Contraseña
    //       </label>
    //       <input
    //         id="password"
    //         type="password"
    //         {...register("password", { required: true})}
    //         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-bgAuthCard"
    //         placeholder="*****"
    //       />
    //       {errors.password && (
    //         <span className="text-red-500">Este campo es requerido</span>
    //       )}
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="confirmPassword" className="text-lg mb-2 block">
    //         Confirmar Contraseña
    //       </label>
    //       <input
    //         id="confirmPassword"
    //         type="password"
    //         {...register("confirmPassword", { required: true })}
    //         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-bgAuthCard"
    //         placeholder="*****"
    //       />
    //       {errors.confirmPassword && (
    //         <span className="text-red-500">Este campo es requerido</span>
    //       )}
    //       {errorPasswornd && (
    //         <span className="text-red-500">Las contraseñas no coinciden</span>
    //       )}
    //     </div>
    //     <button
    //       type="submit"
    //       className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 uppercase"
    //     >
    //       Crear Cuenta
    //     </button>
    //     <span className="block mt-4">
    //       Ya tienes cuenta ? &nbsp;
    //       <Link href="/auth/login" className="text-blue-500 hover:underline">
    //         Inicia sesión
    //       </Link>
    //     </span>
    //   </form>
    // </div>

      <CreateFrom/>
  );
}

"use client";
import { User } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateRole } from "../action/action-createUser";
import { useRouter } from "next/navigation";
interface Props {
  user: User;
}
export default function ChangeRoles({ user }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [rolChange, setRolChange] = useState(false);
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    await updateRole(user.id, data.rol);
    setRolChange(true);
    router.refresh();
  });
  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">
        Cambiar rol del Usuario:{" "}
        <span className="text-sky-600">{user.name}</span>
      </h2>
      {rolChange && (
        <div className="bg-green-500 p-4 rounded-lg mb-6 text-white text-center w-full">
          <p>
            Se ha cambiado el rol correctamente a{" "}
            <span className="font-bold text-">{user.roles}</span>
          </p>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor="rol"
            className="block text-sm font-medium text-gray-700"
          >
            Selecciona el rol
          </label>
          <select
            id="rol"
            {...register("rol")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-gradient-to-r from-sky-600 to-cyan-500 focus:outline-none focus:bg-blue-600 transition-colors "
        >
          Cambiar Rol
        </button>
      </form>
    </div>
  );
}

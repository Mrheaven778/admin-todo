"use client";

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import * as todosApi from "@/todos/helpers/todos";
// import { createTodo, deleteCompleted } from "@/todos/actions/todo-actions";
import { useRouter } from "next/navigation";

export const NewTodo = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) return;

    // await createTodo(title, description, user.id);
    await todosApi.createTodo(title, description);
    router.refresh();

    setDescription("");
    setTitle("");
  };

  const deleteCompleted = async () => {
    await todosApi.deleteCompletedTodos();
    router.refresh();
  };

  return (
    <form className="flex flex-col md:flex-row w-full" onSubmit={onSubmit}>
      <div className="flex flex-col md:flex-row md:gap-12 gap-3 items-center  w-full md:w-auto">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="w-full md:w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
          placeholder="¿Qué necesita ser hecho?"
        />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full md:w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
          placeholder="Descripción"
        />
      </div>

      <button
        type="submit"
        className="flex items-center justify-center rounded  -ml-10 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all mt-2 md:mt-0 md:ml-2"
      >
        <span className="font-semibold">Crear</span>
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => deleteCompleted()}
        type="button"
        className="flex items-center justify-center rounded font-semibold -ml-10 bg-red-400 p-2 text-white hover:bg-red-700 transition-all mt-2 md:mt-0 md:ml-2"
      >
        <IoTrashOutline />
        <span className="ml-2 font-semibold">Borrar Completados</span>
      </button>
    </form>
  );
};

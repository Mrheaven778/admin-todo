"use client";

import { startTransition, useOptimistic, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Todo } from "@prisma/client";
import { deleteTodo, updateTodo } from "../helpers/todos";
import { useRouter } from "next/navigation";
import { CiSaveDown2, CiTrash } from "react-icons/ci";
import { Toaster, toast } from "sonner";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, done: boolean) => Promise<Todo | void>;
}

export const TodoItemUser = ({ todo, toggleTodo }: Props) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      done: newCompleteValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.done));

      await toggleTodo(todoOptimistic.id, !todoOptimistic.done);
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.done));
    }
  };
  const [title, setTitle] = useState(todoOptimistic.title);
  const [description, setDescription] = useState(todoOptimistic.description);
  const [done, setDone] = useState(todoOptimistic.done);
  const [showInputs, setShowInputs] = useState(false);

  const router = useRouter();
  const onClickEdit = () => {
    setShowInputs(true);
  };

  const onSaveChanges = async () => {
    await updateTodo(todoOptimistic.id, done, title, description);
    setShowInputs(false);
    setTitle(title);
    setDescription(description);
    setDone(done);
    toast.success("Cambios guardados",{
      position: "top-center",
    });
    router.refresh();
  };
  const onDelete = async () => {
    await deleteTodo(todoOptimistic.id);
    toast.success("Tarea eliminada",{
      position: "top-center",      
    });
    router.refresh();
  };

  return (
    <div
      className={`p-4  ${
        done
          ? " bg-red-50   rounded-lg shadow-sm p-5 border-dashed border  border-red-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0"
          : "rounded-lg shadow-sm p-5 border-dashed border  flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 border-blue-500 bg-blue-50"
      }`}
    >
      <div className="flex flex-col md:flex-row justify-start  items-center gap-4 md:gap-24">
        <div>
      <Toaster className="text-center bg-slate-900 text-white"/>
          <div className="flex flex-col">
            <span className="font-bold text-lg">{title}</span>
            {showInputs && (
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 my-2 rounded"
              />
            )}
          </div>
          <div className="text-center sm:text-left flex flex-col">
            {description}
            {showInputs && (
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 my-2 rounded"
              />
            )}
          </div>
        </div>
        {showInputs && (
          <div className=" m-auto flex flex-col items-center justify-center mb-4">
            <h3 className="text-xl font-bold mb-4">Tarea realizada:</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                checked={done}
                className="sr-only peer"
                onChange={(e) => setDone(e.target.checked)}
              />
              <div className="group peer ring-0 bg-sky-400 rounded-full outline-none duration-300 after:duration-300 w-24 h-12 shadow-md peer-checked:bg-rose-500 peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-10 after:w-10 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-checked:after:content-['✔️'] peer-hover:after:scale-95"></div>
            </label>
          </div>
        )}
      </div>
      <div className="flex justify-end items-center">
        {!showInputs && (
          <FaEdit size={30} className="cursor-pointer" onClick={onClickEdit} />
        )}
        {showInputs && (
          <div className="flex flex-wrap items-center justify-center gap-4 lg:items-stretch">
            {/* <button className=" bg-gradient-to-r from-sky-600 to-cyan-400 text-white  rounded">
              Guardar cambios
            </button> */}
            <button
              className="flex justify-center items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#14b8a6] via-[#059669] to-[#047857] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#047857] hover:to-[#14b8a6] px-4 py-2 ml-2 "
              onClick={onSaveChanges}
              type="submit"
            >
             <CiSaveDown2 size={30}/>
 
            </button>

            {/* <button className="px-4 py-2 ml-2 w-full  rounded bg-gradient-to-r from-red-600 to-orange-400 text-white"></button> */}
            <button
              className="flex justify-center items-center gap-2 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185] px-4 py-2 ml-2 w-28"
              onClick={onDelete}
            >
             <CiTrash size={30}/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

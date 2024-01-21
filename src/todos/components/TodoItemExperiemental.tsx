"use client";

import React, { startTransition } from "react";
import { useOptimistic } from "react";
import { Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, done: boolean) => Promise<Todo | void>;
}

export default function TodoItem({ todo, toggleTodo }: Props) {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({ ...state, done: newCompleteValue })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.done));
      await toggleTodo(todoOptimistic.id, !todoOptimistic.done);
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.done));
      alert("Error al actualizar el todo");
    }
  };

  return (
    <div className={todoOptimistic.done ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.done)}
          // onClick={() => onToggleTodo()}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            todoOptimistic.done ? "bg-red-100" : "bg-blue-100"
          }`}
        >
          {todoOptimistic.done ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold">{todoOptimistic.title}</h3>
          <p className="text-sm text-gray-500">{todoOptimistic.description}</p>
        </div>
      </div>
    </div>
  );
}

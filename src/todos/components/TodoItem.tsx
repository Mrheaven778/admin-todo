"use client";

import { startTransition, useOptimistic } from "react";

import { Todo } from "@prisma/client";

import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
  todo: Todo;
  // TODO: Acciones que quiero llamar
  toggleTodo: (id: string, done: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
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

  return (
    <div className={todoOptimistic.done ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          // onClick={ () => toggleTodo(todoOptimistic.id, !todoOptimistic.complete) }
          onClick={onToggleTodo}
          className={`
            flex p-2 rounded-md cursor-pointer
            hover:bg-opacity-60
            ${todoOptimistic.done ? "bg-red-100" : "bg-blue-100"}
          `}
        >
          {todoOptimistic.done ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className="text-center sm:text-start">
          <div>
            <span className="font-bold text-lg">{todoOptimistic.title}</span>
          </div>
          <div className="text-center sm:text-left">
            {todoOptimistic.description}
          </div>
        </div>
      </div>
    </div>
  );
};

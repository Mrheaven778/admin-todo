"use client";

import { Todo } from "@prisma/client";
import { toggleTodo } from "../actions/todo-actions";
import { TodoItem } from "./TodoItem";

// import * as todoApi from "./helpers/todos";

interface Props {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {
  // const toggleTodo = async (id: string, done: boolean) => {
  //   const updateTodo = await todoApi.updateTodo(id, done);
  //   router.refresh();
  //   return updateTodo;
  // };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};

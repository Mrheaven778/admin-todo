import { Todo } from "@prisma/client";
import React from "react";
import { toggleTodo } from "../actions/todo-actions";
import { TodoItemUser } from "./TodoItemUser";

interface Props {
  todos: {
    id: string;
    title: string;
    description: string;
    done: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  }[];
}

export default function CardTodoUser({ todos }: Props) {
  return (
    <div>
      {todos.map((todo: Todo) => (
        <div key={todo.id} className="m-2">
          <TodoItemUser key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        </div>
      ))}
    </div>
  );
}

"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

const sleep = (seconds: number = 0): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (id: string, done: boolean): Promise<Todo> => {
  await sleep(1);

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw `Todo con id ${id} no encontrado`;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { done: done },
  });
  revalidatePath("/dashboard/server-todos");
  return updatedTodo;
};

export const createTodo = async (
  title: string,
  description: string,
  userId: string
) => {
  const todo = await prisma.todo.create({
    data: { title, description, userId: userId },
  });
  revalidatePath("/dashboard/server-todos");

  return todo;
};

export const deleteCompleted = async (id: string) => {
  await prisma.todo.deleteMany({ where: { done: true, userId: id } });
  revalidatePath("/dashboard/server-todos");
};

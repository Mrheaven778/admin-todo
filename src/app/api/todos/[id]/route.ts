import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = await prisma.todo.findFirst({
    where: {
      id: id,
    },
  }); // esto seria igual que un SELECT * FROM todos WHERE id = id
  // si no se encuentra la id retornamos un error
  if (!todo) {
    return NextResponse.json(
      { error: `No se ha encontrado la id: ${id}` },
      {
        status: 400,
      }
    );
  }
  return NextResponse.json(todo);
}

const postSchema = yup.object().shape({
  title: yup.string().optional(),
  description: yup.string().optional(),
  done: yup.boolean().optional().default(false),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = await prisma.todo.findFirst({
    where: {
      id: id,
    },
  }); // esto seria igual que un SELECT * FROM todos WHERE id = id
  // si no se encuentra la id retornamos un error
  if (!todo) {
    return NextResponse.json(
      { error: `No se ha encontrado la id: ${id}` },
      {
        status: 400,
      }
    );
  }
  try {
    const { title, description, done } = await postSchema.validate(
      await request.json()
    );
    const todoUpdate = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        done: done,
      },
    }); // esto seria igual que un UPDATE todos SET title = title, description = description, done = done WHERE id = id
    return NextResponse.json(todoUpdate);
  } catch (error) {
    return NextResponse.json(
      { error: `Ha ocurrido un error: ${error}` },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = await prisma.todo.findFirst({
    where: {
      id: id,
    },
  }); // esto seria igual que un SELECT * FROM todos WHERE id = id
  // si no se encuentra la id retornamos un error
  if (!todo) {
    return NextResponse.json(
      { error: `No se ha encontrado la id: ${id}` },
      {
        status: 400,
      }
    );
  }
  try {
    const todoDelete = await prisma.todo.delete({
      where: {
        id: id,
      },
    }); // esto seria igual que un DELETE FROM todos WHERE id = id
    return NextResponse.json(todoDelete);
  } catch (error) {
    return NextResponse.json(
      { error: `Ha ocurrido un error: ${error}` },
      {
        status: 400,
      }
    );
  }
}

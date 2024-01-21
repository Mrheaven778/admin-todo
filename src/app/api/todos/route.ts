import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // si no viene nada en los take por defecto sera 10 registros que mostraremos
  const take = Number(searchParams.get("take") ?? "10");
  // si no viene nada en los skip por defecto sera 0 registros los que nos saltaremos
  const skip = Number(searchParams.get("skip") ?? "0");
  // si el parametro take no es un numero retornamos un error
  if (isNaN(take)) {
    return NextResponse.json(
      { error: "El parametro take debe ser un numero" },
      {
        status: 400,
      }
    );
  }
  // si el parametro skip no es un numero retornamos un error
  if (isNaN(skip)) {
    return NextResponse.json(
      { error: "El parametro skip debe ser un numero" },
      {
        status: 400,
      }
    );
  }

  // seleccionamos todos los datos de la base de datos
  const todo = await prisma.todo.findMany({
    take: take,
    skip: skip,
  }); // esto seria igual que un SELECT * FROM todos LIMIT take OFFSET skip
  // retornamos los datos en formato JSON
  return NextResponse.json(todo);
}

// Definimos un esquema de validación para un objeto con Yup.
const postSchema = yup.object({
  // El objeto debe tener una propiedad 'title' que debe ser una cadena y es obligatoria.
  title: yup.string().required(),
  // El objeto debe tener una propiedad 'description' que debe ser una cadena y es obligatoria.
  description: yup.string().required(),
  // El objeto debe tener una propiedad 'done' que debe ser un booleano y es opcional.
  done: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  const user = await getUserSessionServer();
  if (!user) {
    return NextResponse.json(
      { error: "No estas autorizado para realizar esta accion" },
      {
        status: 401,
      }
    );
  }
  try {
    // Desestructuramos directamente el resultado de la validación del esquema.
    const { title, description, done } = await postSchema.validate(
      await request.json()
    );

    // Creamos un nuevo registro en la tabla 'todo'.
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        done,
        userId: user.id,
      },
    });

    // Devolvemos la nueva tarea creada.
    return NextResponse.json(todo);
  } catch (error) {
    // Si el error es una instancia de yup.ValidationError, devolvemos un código de estado 422.
    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ error: error.errors }, { status: 422 });
    }

    // Para cualquier otro error, devolvemos un código de estado 400.
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const user = await getUserSessionServer();
  if (!user) {
    return NextResponse.json(
      { error: "No estas autorizado para realizar esta accion" },
      {
        status: 401,
      }
    );
  }
  try {
    const todo = await prisma.todo.deleteMany({
      where: {
        done: true,
        userId: user.id,
      },
    });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

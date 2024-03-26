"use server";

import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export const newImg = async (id: string, urlImg: string, form: any) => {
  const existsUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!existsUser) {
    throw new Error("User not found");
  }

  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      image: urlImg,
    },
  });


  const file = form.get("file");
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  // const filePath = path.resolve(process.cwd(), "public", "img", urlImg);
  const filePathtest = path.resolve(process.cwd(), `./public/img/${urlImg}`);
  console.log(filePathtest);
  // writeFile(filePath, buffer);
  writeFile(filePathtest, buffer);

  return user;
};

export const selectImg = async (id: any) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.image;
};

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      todos: true,
    },
  });
  return users;
};

export const getUser = async (id: any) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      todos: true,
    },
  });
  if (!user) {
    throw new Error("User no encontrado");
  }
  return user;
};

export const updateRole = async (id: any, role: any) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        roles: role,
      },
    });
    return user;
  } catch (error) {
    throw new Error("User not found");
  }
};

"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const getUserSessionServer = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
};

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("El correo no esta registrado");
  }

  if (!bcrypt.compareSync(password, user.password ?? "")) {
    throw new Error("Contraseña incorrecta");
  }
  return user;
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  // validamos si el correo no esta duplicado
  const userExist = await prisma.user.findFirst({ where: { email } });
  if (userExist) {
    throw new Error("El correo ya esta registrado");
  }

  const user = await prisma.user.create({
    data: {
      email: email,
      password: bcrypt.hashSync(password),
      name: name,
    },
  });
  return user;
};

export const createUserFrom = async (
  name: string,
  email: string,
  password: string
) => {
  // validamos si el correo no esta duplicado
  const userExist = await prisma.user.findUnique({ where: { email } });
  if (userExist) {
    throw new Error("El correo ya esta registrado");
  }

  const user = await prisma.user.create({
    data: {
      email: email,
      password: bcrypt.hashSync(password),
      name: name,
    },
  });
  // const verificationToken = await generateVerificationToken(email);
  // console.log({ verificationToken });
  return user;
};

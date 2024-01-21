import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Por favor, introduce una dirección de correo electrónico válida",
  }),
  password: z.string().min(1, {
    message: "Por favor ingrese una contraseña",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Por favor, introduce una dirección de correo electrónico válida",
  }),
  password: z.string().min(1, {
    message: "Por favor ingrese una contraseña",
  }),
  name: z.string().min(1, {
    message: "Por favor ingrese un nombre",
  }),
  confirmPassword: z.string().min(1, {
    message: "Repita la contraseña",
  }),
});

"use client";

import { Lemon } from "next/font/google";
import { useState, useTransition } from "react";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/auth/CardWrapper";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import FormErros from "@/components/FormErros";
import FormSucces from "@/components/FormSucces";
import { cn } from "@/lib/utils";
import { createUserFrom } from "../actions/auth-actions";

const lemon = Lemon({
  subsets: ["latin"],
  weight: ["400"],
});

function CreateFrom() {
  const router = useRouter();
  const [errorPasswornd, setErrorPasswornd] = useState(false);
  const [messageError, setmessageError] = useState("");
  const [isPending, setTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = form.handleSubmit(async (data) => {
    const { name, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      setErrorPasswornd(true);
      return;
    }
    setTransition(async () => {
      +(await createUserFrom(name, email, password));
      router.push("/auth/login");
    });
  });
  return (
    <>
      <CardWrapper
        headerLabel="Crear Cuenta"
        backButtonHref="/auth/login"
        backButtonLabel="Ya tengo una cuenta"
        header="✍️ Crear Cuenta"
      >
        <Form {...form}>
          <form
            action=""
            onSubmit={onSubmit}
            className={cn("space-y-6 ", lemon.className)}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Nombre de Usuario</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="John Doe"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* {error && <FormErros message={messageError} />} */}
            {/* <FormSucces message={""} /> */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="user@gmail.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="********"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmPassword">Confirmar Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="********"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full" type="submit" disabled={isPending}>
              Crear Cuenta
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
}

export default CreateFrom;

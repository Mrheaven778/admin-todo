"use client";

import { Lemon } from "next/font/google";
import { useState, useTransition } from "react";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
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

const lemon = Lemon({
  subsets: ["latin"],
  weight: ["400"],
});
export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [messageError, setmessageError] = useState("");
  const [isPending, setTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = form.handleSubmit((data) => {
    setTransition(async () => {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        setmessageError(res.error);
        setError(true);
      } else {
        setError(false);
        router.push("/dashboard");
      }
    });
  });

  return (
    <>
      <CardWrapper
        headerLabel="Bienvenido de nuevo"
        backButtonHref="/auth/register"
        backButtonLabel="No tienes cuenta?"
        header="🔐 Iniciar Sesión"
      >
        <Form {...form}>
          <form
            action=""
            onSubmit={onSubmit}
            className={cn("space-y-6", lemon.className)}
          >
            {error && <FormErros message={messageError} />}
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
            <Button className="w-full" type="submit" disabled={isPending}>
              Iniciar Sesión
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
}

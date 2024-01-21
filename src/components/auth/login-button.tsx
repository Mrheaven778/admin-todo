"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}
export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const router = useRouter();
  const onClick = handleSubmit((data) => {
    router.push("/login");
  });
  if (mode === "modal") {
    return <span>Todo</span>;
  }
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};

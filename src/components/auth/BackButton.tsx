"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  label: string;
  href: string;
}

function BackButton({ label, href }: Props) {
  return (
    <Button className="w-full font-normal " variant={"link"} size={"sm"} asChild>
      <Link href={href}>
        {label}
      </Link>
    </Button>
  );
}

export default BackButton;

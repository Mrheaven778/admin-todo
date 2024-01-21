import { Lemon } from "next/font/google";
import { cn } from "@/lib/utils";

const lemon = Lemon({
  subsets: ["latin"],
  weight: ["400"],
});

interface Props {
  label: string;
  header: string;
}

export const Header = ({ header,label }: Props) => {
  return (
    <div className=" w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold", lemon.className)}>
        {header}
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

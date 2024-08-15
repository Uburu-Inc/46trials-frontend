import { FC } from "react";
import { cn } from "@/lib/tailwind/cn";

interface Props {
  onClick?: () => void;
  label: string;
  className?: string;
}

export function Tag({ onClick, label, className }: Props) {
  const tagClickFunction = () => {
    if (!onClick) return;
    onClick();
  };
  return (
    <div
      className={cn(
        "bg-black text-white rounded-xl text-[0.8rem] p-[0.5rem] cursor-pointer font-[500]",
        className
      )}
      onClick={tagClickFunction}
    >
      {label}
    </div>
  );
}

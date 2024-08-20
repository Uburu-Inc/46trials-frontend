import { cn } from "@/lib/tailwind/cn";
import { ContainerPropTypes } from "./type";

export function Container({ className, children }: ContainerPropTypes) {
  return (
    <div className={cn("px-16 2xl:mx-auto 2xl:w-[1400px]", className)}>
      {children}
    </div>
  );
}

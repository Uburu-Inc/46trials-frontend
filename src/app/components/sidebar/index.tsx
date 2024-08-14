"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppIcon } from "@/components/icons/app-icon";
import { ButtonComponent } from "@/components/button";
import { MenuItems } from "./constant";
import { Plus } from "./icons/plus";
import { cn } from "@/lib/tailwind/cn";

export function SideBar() {
  const currentPath = usePathname();
  return (
    <section className="w-full py-14 px-4">
      <div className="flex justify-center">
        <AppIcon />
      </div>

      <Link href={"/project"}>
        <ButtonComponent className="flex gap-2 w-full bg-black font-[400] text-[0.8rem] mt-10">
          <Plus />
          <span>Create Project</span>
        </ButtonComponent>
      </Link>

      <div className="px-5 mt-10">
        {MenuItems.map(({ text, Icon, path }, index) => (
          <Link href={path} key={index}>
            <button
              className={cn(
                "flex gap-3 hover:bg-[lightgray] w-full rounded-md py-5 px-5 transition duration-300 ease-in-out mt-5",
                path === currentPath ? "bg-white" : "bg-transparent"
              )}
            >
              <Icon />
              <span className="text-[0.8rem] mt-[0.1rem]">{text}</span>
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
}

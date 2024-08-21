"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../shadcn-components/tabs";

import { TabTypes } from "./type";
import { cn } from "@/lib/tailwind/cn";

export function Tab({ className, current, title, interfaceItems }: TabTypes) {
  const router = useRouter();
  const currentPath = usePathname();

  function switchTab(tab: string) {
    router.push(`${currentPath}?current=${tab}`);
  }

  return (
    <Tabs
      defaultValue={current}
      className={cn("bg-transparent", className)}
      onValueChange={(tab) => switchTab(tab)}
    >
      <div className="w-full border-b pb-0 h-[2.4rem]">
        <TabsList className="bg-transparent w-fit mb-0">
          {title.map(({ value, text }, index) => (
            <TabsTrigger
              key={index}
              value={value}
              className="border-b-4 border-transparent data-[state=active]:border-[#FB5806] rounded-none"
            >
              {text}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {interfaceItems.map(({ value, component }, index) => (
        <TabsContent value={value} key={index} className="px-5 my-8">
          {component}
        </TabsContent>
      ))}
    </Tabs>
  );
}

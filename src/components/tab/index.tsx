"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn-components/tabs";

import { TabTypes } from "./type";

export function Tab({ title, interfaceItems }: TabTypes) {
  return (
    <Tabs defaultValue="password" className="bg-transparent">
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
        <TabsContent value={value} key={index}>{component}</TabsContent>
      ))}
    </Tabs>
  );
}

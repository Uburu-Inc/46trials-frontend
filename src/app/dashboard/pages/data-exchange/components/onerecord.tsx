"use client";

import { cn } from "@/lib/tailwind/cn";
import { useState } from "react";
import { DashboardCard } from "../../../components/card";

export function OneRecord() {
  const [status, setStatus] = useState(0);
  return (
    <section>
      <div className="flex gap-3">
        <button
          onClick={() => setStatus(0)}
          className={cn(
            "py-2 px-5 rounded-2xl text-sm",
            status === 0
              ? "bg-black text-white border border-transparent"
              : "bg-transparent text-black border border-black"
          )}
        >
          Pending
        </button>
        <button
          onClick={() => setStatus(1)}
          className={cn(
            "py-2 px-5 rounded-2xl text-sm border border-transparent",
            status === 1
              ? "bg-black text-white"
              : "bg-transparent text-black border border-black"
          )}
        >
          Fulfilled
        </button>
      </div>

      <div className="py-10">
        {status === 0 && (
          <div className="flex justify-between">
            <div className="w-[31%]">
              <DashboardCard
                title="Created 23 hours ago by Kene"
                content="JohnDoe78328932"
                path="/dashboard/pages/data-exchange/10101010101010101"
              />
            </div>
            <div className="w-[31%]">
              <DashboardCard
                title="Created 23 hours ago by Kene"
                content="JohnDoe78328932"
                path="/dashboard/pages/data-exchange/10101010101010101"
              />
            </div>
            <div className="w-[31%]">
              <DashboardCard
                title="Created 23 hours ago by Kene"
                content="JohnDoe78328932"
                path="/dashboard/pages/data-exchange/10101010101010101"
              />
            </div>
          </div>
        )}
        {status === 1 && (
          <div className="flex justify-between">
            <div className="w-[31%]">
              <DashboardCard
                title="Created 23 hours ago by Kene"
                content="JohnDoe78328932"
                path="/dashboard/pages/data-exchange/10101010101010101"
              />
            </div>
            <div className="w-[31%]">
              <DashboardCard
                title="Created 23 hours ago by Kene"
                content="JohnDoe78328932"
                path="/dashboard/pages/data-exchange/10101010101010101"
              />
            </div>
            <div className="w-[31%]">
              <DashboardCard
                title="Created 23 hours ago by Kene"
                content="JohnDoe78328932"
                path="/dashboard/pages/data-exchange/10101010101010101"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

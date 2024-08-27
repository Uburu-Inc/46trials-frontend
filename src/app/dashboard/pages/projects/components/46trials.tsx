"use client";

import { cn } from "@/lib/tailwind/cn";
import { useState } from "react";
import { DashboardCard } from "../../../components/card";
import { useFetch46Trials } from "../../../hooks/projects/46trials/fetch-trials";
import { Loader } from "@/app/components/reusable-components/loader";

export function FortySixTrials() {
  const { loading, data } = useFetch46Trials();
  const [status] = useState(0);
  return (
    <section>
      {/* <div className="flex gap-3">
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
      </div> */}

      {loading ? (
        <div className="flex justify-center">
          <Loader className="h-14 w-14" />
        </div>
      ) : (
        <div className="py-3">
          {status === 0 && (
            <div className="flex justify-between flex-wrap">
              {data?.results.map((item, index) => (
                <div className="w-[31%]" key={index}>
                  <DashboardCard
                    className="mt-7"
                    title={`Created on ${new Date(
                      item.created_at
                    ).toDateString()}`}
                    content={item.name}
                    path={`/dashboard/pages/projects/${
                      item.id
                    }/${item.name.replaceAll(" ", "-")}`}
                  />
                </div>
              ))}
            </div>
          )}
          {status === 1 && (
            <div className="flex justify-between flex-wrap">
              {data?.results.map((item, index) => (
                <div className="w-[31%]" key={index}>
                  <DashboardCard
                    className="mt-7"
                    title={`Created on ${new Date(
                      item.created_at
                    ).toDateString()}`}
                    content={item.name}
                    path={`/dashboard/pages/projects/${item.id}/${item.name
                      .replaceAll(" ", "-")
                      .toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

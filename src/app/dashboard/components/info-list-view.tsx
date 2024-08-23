"use client";

import { ButtonComponent } from "@/app/components/reusable-components/button";
import { cn } from "@/lib/tailwind/cn";

interface Props {
  institution: string;
  location: string;
  date: string;
  className?: string;
  onDownload?: () => void
}

export function InfoListView({
  institution,
  location,
  date,
  className,
  onDownload
}: Props) {
  return (
    <div
      className={cn(
        "flex justify-between bg-[#FAFAFA] px-8 py-5 rounded-md",
        className
      )}
    >
      <div className="flex gap-2 w-[30%]">
        <div className="flex ">
          <div className="bg-[blue] h-14 w-14 rounded-md"></div>
          <div className="px-3 mt-1">
            <p className="text-md font-[600]">{institution}</p>
            <p className="text-sm">{location}</p>
          </div>
        </div>
      </div>

      <div className="w-[30%] pt-3">
        <p className="text-center text-sm">Date</p>
        <p className="text-center text-sm">{date}</p>
      </div>

      <div className="w-[30%] flex justify-end mt-2">
        <ButtonComponent onClick={onDownload}>Download</ButtonComponent>
      </div>
    </div>
  );
}

"use client";

import {
  Card,
  CardContent,
} from "@/app/components/reusable-components/shadcn-components/card";

interface Props {
  sampleSize: string;
  budget: string;
  startDate: string;
  endDate: string;
}

export function ProjectSummaryComponent({
  sampleSize,
  budget,
  startDate,
  endDate,
}: Props) {
  return (
    <section>
      <div className="mt-3 flex justify-between">
        <Card className="pt-6 w-[32%]">
          <CardContent>
            <p className="text-[gray] text-sm">Sample size</p>
            <p className="text-md text-[gray] font-[600]">{sampleSize}</p>
          </CardContent>
        </Card>
        <Card className="pt-6 w-[32%]">
          <CardContent>
            <p className="text-[gray] text-sm">Budget</p>
            <p className="text-md text-[gray] font-[600]">₦{budget}</p>
          </CardContent>
        </Card>
        <Card className="pt-6 w-[32%]">
          <CardContent>
            <p className="text-[gray] text-sm">Analysis Timeline</p>
            <p className="text-md text-[gray] font-[600]">
              {startDate ?? ""} - {endDate ?? ""}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

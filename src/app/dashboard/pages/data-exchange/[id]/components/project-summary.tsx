import { Card, CardContent } from "@/components/shadcn-components/card";

export function ProjectSummaryComponent() {
  return (
    <>
      <p className="font-[600]">Acne.Inc</p>
      <div className="mt-3 flex justify-between">
        <Card className="pt-6 w-[32%]">
          <CardContent>
            <p className="text-[gray] text-sm">Sample size</p>
            <p className="text-md text-[gray] font-[600]">1200</p>
          </CardContent>
        </Card>
        <Card className="pt-6 w-[32%]">
          <CardContent>
            <p className="text-[gray] text-sm">Budget</p>
            <p className="text-md text-[gray] font-[600]">₦50000</p>
          </CardContent>
        </Card>
        <Card className="pt-6 w-[32%]">
          <CardContent>
            <p className="text-[gray] text-sm">Analysis Timeline</p>
            <p className="text-md text-[gray] font-[600]">1/1/2022 - 1/1/2024</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

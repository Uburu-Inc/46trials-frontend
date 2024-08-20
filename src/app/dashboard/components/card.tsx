import Link from "next/link";
import { Card, CardContent } from "@/components/shadcn-components/card";

interface DashboardCardProps {
  title: string;
  path: string
  content: string;
}

export function DashboardCard({ title, path, content }: DashboardCardProps) {
  return (
    <Card className="w-full pt-6">
      <CardContent>
        <Link href={path}>
          <p className="font-[500] text-md hover:underline">{title}</p>
        </Link>
        <p className="text-[gray]">{content}</p>
      </CardContent>
    </Card>
  );
}

import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/app/components/reusable-components/shadcn-components/card";
import { cn } from "@/lib/tailwind/cn";
interface DashboardCardProps {
  title: string;
  path: string;
  content: string;
  className?: string;
}

export function DashboardCard({
  title,
  path,
  content,
  className,
}: DashboardCardProps) {
  return (
    <Card className={cn("w-full pt-6", className)}>
      <CardContent>
        <Link href={path}>
          <p className="font-[500] text-sm hover:underline">{title}</p>
        </Link>
        <p className="text-[gray] text-[0.8rem]">{content}</p>
      </CardContent>
    </Card>
  );
}

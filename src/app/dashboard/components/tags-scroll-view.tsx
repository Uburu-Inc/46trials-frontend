
import { cn } from "@/lib/tailwind/cn";
import { Tag } from "./tag";

interface Props {
  items: Array<string>;
  className?: string;
}

export function TagsScrollView({ items, className }: Props) {
  return (
    <div className={cn("flex gap-3 overflow-x-auto", className)}>
      {items.map((item, index) => (
        <Tag label={item} key={index} className="w-fit flex-shrink-0" />
      ))}
    </div>
  );
}

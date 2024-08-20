import { cn } from "@/lib/tailwind/cn";

interface Props {
  title: Array<string>;
  header: string;
}

export function HeaderTitle({ title, header }: Props) {
  return (
    <>
      <div className="flex">
        {title.map((item, index) => (
          <div key={index} className="flex">
            <p
              className={cn(
                "text-sm px-2.5 mt-[0.2rem]",
                title.length === index + 1 ? "text-[#FB5806]" : "text-[$AAAAAA]"
              )}
            >
              {item}
            </p>
            {title.length === index + 1 ? "" : "-"}
          </div>
        ))}
      </div>
      <p className="text-xl font-[500] px-2 mt-1">{header}</p>
    </>
  );
}

import { RequiredColumnMainProps, RequiredColumnProps } from "../../utils/type";
import { Tag } from "../../../../../../components/tag";
import { cn } from "@/lib/tailwind/cn";

interface Props {
  onSelect: (payload: RequiredColumnProps) => void;
  data: RequiredColumnMainProps;
}

export function ColumnTags({ onSelect, data }: Props) {
  return (
    <>
      <div className={"w-full mt-[1rem]"}>
        <p className={"text-black text-[0.9rem] mt-[0.3rem]"}>
          Please select required column tags from our standard available column
          headers.
        </p>
        <div
          className={
            "bg-[#f8f8f8] flex gap-[0.8rem] flex-wrap p-[1.1rem] mt-[1rem]"
          }
        >
          {data.map(({ column, isSelected, id, dictionaryKeys }, index) => (
            <Tag
              key={index}
              className={cn(isSelected ? "bg-[#acb0b3]" : "")}
              onClick={() =>
                onSelect({ id, isSelected: false, column, dictionaryKeys })
              }
              label={column ?? ""}
            />
          ))}
        </div>
      </div>
    </>
  );
}

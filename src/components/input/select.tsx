import { useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/tailwind/cn";
import { SelectProps } from "./types";
import { Label } from "./components/label";
import { Error } from "./components/error";

export function SelectInput({
  placeholder,
  items,
  className,
  onChange,
  id,
  label,
  error,
  selectWithSearch,
}: SelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const handleToggleCardVisibility = useCallback(
    function (togglePayload: boolean) {
      setOpen(togglePayload);
    },
    []
  );

  const handleSelect = useCallback(
    function (item: any) {
      onChange(JSON.stringify(item));
      setSearchTerm(item.text);
      handleToggleCardVisibility(false);
    },
    [handleToggleCardVisibility, onChange]
  );

  return (
    <>
      {label && (
        <Label htmlFor={id ?? ""} className="mb-5">
          {label}
        </Label>
      )}

      {selectWithSearch ? (
        <div className="relative">
          <Input
            className="w-full focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-2 border-2 focus:border-[#FB5806] py-5 px-5 rounded-lg mt-3"
            onFocus={() => handleToggleCardVisibility(true)}
            onBlur={() => handleToggleCardVisibility(false)}
            onChange={(event) => setSearchTerm(event.target.value)}
            value={searchTerm}
            placeholder={placeholder}
          />
          {open && (
            <Card className="mt-3 absolute w-full max-h-[20rem] overflow-auto">
              <ul className="px-1 py-1">
                {items
                  .filter((item) =>
                    item.text.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item, index) => (
                    <li
                      key={index}
                      className="border-b py-2 px-6 cursor-pointer hover:bg-[#f1f5f9] list-none text-sm rounded-sm"
                      onMouseDown={() => handleSelect(item)}
                    >
                      {item.text}
                    </li>
                  ))}
              </ul>
            </Card>
          )}
        </div>
      ) : (
        <Select onValueChange={(payload) => onChange(payload)}>
          <SelectTrigger className={cn("w-[180px] mt-3", className)}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map(({ value, text }, index) => (
                <SelectItem key={index} value={value} className="border-b py-2">
                  {text}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      {error && <Error className="mt-3">{error}</Error>}
    </>
  );
}

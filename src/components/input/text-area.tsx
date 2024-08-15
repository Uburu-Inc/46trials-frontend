import { Textarea } from "@/components/shadcn-components/textarea";
import { TextAreaProps } from "./types";
import { Label } from "./components/label";
import { Error } from "./components/error";

export function TextArea({ label, error, id, ...props }: TextAreaProps) {
  return (
    <>
      {label && <Label htmlFor={id ?? ""}>{label}</Label>}
      <Textarea
        className="w-full focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-2 border-2 focus:border-[#FB5806] py-5 px-5 rounded-lg mt-3"
        {...props}
      />
      {error && <Error className="mt-2">{error}</Error>}
    </>
  );
}

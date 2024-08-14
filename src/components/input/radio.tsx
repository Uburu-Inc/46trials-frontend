import { Label } from "@/components/shadcn-components/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/shadcn-components/radio-group";

interface Props {
  label: string;
  id: string;
}

export function RadioInput({ label, id }: Props) {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id={id} />
        <Label htmlFor={id}>{label}</Label>
      </div>
    </RadioGroup>
  );
}

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { ButtonProps } from "./type";

export function ButtonComponent({
  className,
  children,
  loading,
  ...props
}: ButtonProps) {
  return (
    <Button
      className={`bg-[#FB5806] flex ${loading ? "gap-3" : ""} ${
        className ?? ""
      }`}
      disabled={loading}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </Button>
  );
}

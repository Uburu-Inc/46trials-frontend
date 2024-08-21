import { ReactNode } from "react";

export interface DrawerProps {
  title: string;
  proceedText?: string;
  onProceed?: () => void;
  description: string;
  children: ReactNode;
}

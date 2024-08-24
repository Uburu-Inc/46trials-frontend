import { ReactNode } from "react";

export type ModalProps = {
  title?: string;
  description?: string;
  modalIcon?: ReactNode;
  closeButtonTitle?: string;
  children: ReactNode;
  onProceed?: () => void;
};

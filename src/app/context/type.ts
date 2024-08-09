import { ReactNode } from "react";
import { InstitutionArray } from "../types";

export type AppInfoParams = {
  uid: string;
  legal_name: string;
  token: string;
  phone: string;
  email: string;
};

export type UserPaymentInfoPayload = {
  username?: string;
  phone_number?: string;
};
export interface GeneralInstitutionProps {
  loading: boolean;
  success: boolean;
  institutions: InstitutionArray;
}

export type ContextPayload = {
  params: AppInfoParams;

  userPaymentInfo?: UserPaymentInfoPayload;
  recordId?: number;
  institutionInfo: GeneralInstitutionProps;
  setInstitutions: (institutionInfo: GeneralInstitutionProps) => void;
  setRecordId?: (id: number) => void;
  setUser: (payload: AppInfoParams) => void;
};

export interface AppContainerProps {
  children: ReactNode;
}

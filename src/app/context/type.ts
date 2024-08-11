import { ReactNode } from "react";
import { InstitutionArray } from "../types";

export type AppInfoParams = {
  token: string;
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
  setUser: (payload: AppInfoParams) => void;
};

export interface AppContainerProps {
  children: ReactNode;
}

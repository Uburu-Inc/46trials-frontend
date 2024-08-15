import { ReactNode } from "react";

export type AppInfoParams = {
  token: string;
  uid: string
};

export type UserPaymentInfoPayload = {
  username?: string;
  phone_number?: string;
};

export type ContextPayload = {
  params: AppInfoParams;
  setUser: (payload: AppInfoParams) => void;
};

export interface AppContainerProps {
  children: ReactNode;
}

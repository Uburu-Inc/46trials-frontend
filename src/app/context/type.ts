import { ReactNode } from "react";

export type AppInfoParams = {
  token: string;
  uid: string;
};

export type User = {
  email: string;
};

export type UserPaymentInfoPayload = {
  username?: string;
  phone_number?: string;
};

export type ContextPayload = {
  params: AppInfoParams;
  userInfo: string;
  setProfile: (payload: string) => void;
  setUser: (payload: AppInfoParams) => void;
};

export interface AppContainerProps {
  children: ReactNode;
}

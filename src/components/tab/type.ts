import { ReactNode } from "react";

export interface TitleTypes {
  value: string;
  text: string;
}

export interface InterfaceTypeProps {
  value: string;
  component: ReactNode
}

export interface TabTypes {
  current: string;
  title: Array<TitleTypes>;
  interfaceItems: Array<InterfaceTypeProps>;
}

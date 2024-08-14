import { ElementType } from "react";
import { DataExchange } from "./icons/data-exchange"
import { Account } from "./icons/account";

export interface MenuItemsTypes {
    text: string;
    Icon: ElementType,
    path: string
}

export const MenuItems: Array<MenuItemsTypes> = [
  {
    text: "Data Exchange",
    Icon: DataExchange,
    path: "/data-exchange",
  },
  {
    text: "Account",
    Icon: Account,
    path: "/account",
  },
];

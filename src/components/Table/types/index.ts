import { ReactNode } from "react";

export type TableHeader = Item[];

export type TableBody = BodyItems[];

type BodyItems = {
  items: Item[];
};

type Item = {
  value: string | ReactNode;
  width?: string;
};

export type TableProps = {
  header: TableHeader;
  body: TableBody;
};

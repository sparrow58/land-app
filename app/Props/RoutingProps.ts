import { ReactNode } from "react";
import { Locale } from "./../../i18n.config";
export type LangParams = {
  params: {
    lang: Locale;
  };
};
export type IdParams = {
  params: {
    id: string;
  };
};
export type SearchParams = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export interface LinkItemProps {
  url: string;
  text: string;
  children?: ReactNode;
}

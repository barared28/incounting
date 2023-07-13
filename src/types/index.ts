import { ColumnInterface, Accessor } from "react-table";
export type AuthType = "not-login" | "logined" | "have-business";
export type ColumnTableType =
  | "simple"
  | "images"
  | "title-desc"
  | "currency"
  | "label-status"
  | "actions"
  | "links"
  | "checkbox";
export interface ColumnTable<T extends object> extends ColumnInterface<T> {
  accessor: Accessor<T> | string;
  Cell?: (val: T) => React.ReactNode;
  types?: ColumnTableType;
}

export type TKeyGroupRouter = "dashboard" | "property" | "payment";
export type TKeySubRouter =
  | "main_dashboard"
  | "property_type"
  | "property_schedule"
  | "property";

export interface IBreadcrumb {
  label: string;
  path?: string;
  type?: "redirect" | "action" | "no-action";
  action?: () => void;
}

export interface IPaginationResponse {
  total: number;
  page?: number;
  limit?: number;
  total_pages?: number;
}

export type TFormType = "create" | "update";
export type TPageDialogType = TFormType | "view";

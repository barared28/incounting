import { IResponseDataProperty } from "@/services/property";
import { IDataOptionProperty } from ".";

export const generateDataOption = (
  data: IResponseDataProperty[]
): IDataOptionProperty[] => {
  const res: IDataOptionProperty[] = data.map((val) => ({
    name: val?.name,
    label: val?.name,
    price: val?.type?.price || 0,
    typeName: val?.type?.name || "-",
    value: val?.id ? String(val.id) : "",
  }));
  return res || [];
};

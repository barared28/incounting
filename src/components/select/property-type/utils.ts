import { IResponseDataPropertyType } from "@/services/property-type";
import { IDataOptionPropertyType } from ".";

export const generateDataOption = (
  data: IResponseDataPropertyType[],
  selectedData?: {
    name: string;
    price: number;
    id: number;
  },
  value?: string
): IDataOptionPropertyType[] => {
  const res: IDataOptionPropertyType[] = data.map((val) => ({
    label: val?.name,
    name: val?.name,
    price: val?.price,
    value: String(val?.id),
  }));
  if (selectedData && value === String(selectedData?.id)) {
    const find = res?.find((val) => val.value === String(selectedData?.id));
    if (!find) {
      res?.push({
        label: selectedData?.name,
        name: selectedData?.name,
        price: selectedData?.price,
        value: String(selectedData?.id),
      });
    }
  }
  return res || [];
};

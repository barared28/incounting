import { IResponseDataContact } from "@/services/contact";
import { IDataOptionCustomers } from ".";

export const generateDataOption = (
  data: IResponseDataContact[],
  selectedData: IResponseDataContact
): IDataOptionCustomers[] => {
  const res: IDataOptionCustomers[] = data.map((val) => {
    return {
      email: val?.email || "",
      name: val?.name || "",
      label: val?.email ? `${val?.name} - (${val?.email})` : val?.name || "",
      value: val?.id ? String(val?.id) : "",
      image: "",
    };
  });

  if (selectedData?.id) {
    const isExist = res.find((val) => +val?.value === +selectedData?.id);
    if (!isExist) {
      res.push({
        email: selectedData?.email || "",
        name: selectedData?.name || "",
        label: selectedData?.email
          ? `${selectedData?.name} - (${selectedData?.email})`
          : selectedData?.name || "",
        value: selectedData?.id ? String(selectedData?.id) : "",
        image: "",
      });
    }
  }

  return res || [];
};

import { getBusinessType } from "@/services/business";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

export const useOptionBusinessType = (selectedData: any) => {
  const [data, setData] = useState<any>([]);
  const query = useQuery(["business-type-option"], async () =>
    getBusinessType()
  );

  useEffect(() => {
    const rawData =
      query.data?.map((val: any) => ({
        label: val?.en_title || "",
        value: val?.id || "",
      })) || [];
    if (selectedData) {
      const isExist = rawData.find(
        (val: any) => +val.value === +selectedData?.id
      );
      if (!isExist) {
        rawData.push({
          label: selectedData?.en_title || "",
          value: selectedData?.id || "",
        });
      }
    }
    setData(rawData);
  }, [query.data, selectedData]);

  return { ...query, data };
};

import { getBankCategory } from "@/services/bank-category";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

export const useOptionBankCategory = (search: string, selectedData: any) => {
  const [data, setData] = useState<any>([]);
  const payload: any = { page: 1, limit: 5 };
  if (search) payload.name = search;
  const query = useQuery(["bank-category-option"], async () =>
    getBankCategory(payload)
  );

  useEffect(() => {
    query.refetch();
  }, [search]);

  useEffect(() => {
    const rawData =
      query.data?.data?.map((val) => ({
        label: val?.name || "",
        value: val?.id || "",
      })) || [];
    if (selectedData) {
      const isExist = rawData.find((val) => val.value === selectedData?.id);
      if (!isExist) {
        rawData.push({
          label: selectedData?.name || "",
          value: selectedData?.id || "",
        });
      }
    }
    setData(rawData);
  }, [query.data, selectedData]);

  return { ...query, data };
};

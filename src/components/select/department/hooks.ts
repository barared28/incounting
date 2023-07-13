import { getDepartment } from "@/services/department";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const useOptionDepartment = (search: string) => {
  const [data, setData] = useState<any>([]);
  const payload: any = { page: 1, limit: 5 };
  if (search) payload.name = search;

  const query = useQuery(["department-option"], async () =>
    getDepartment(payload)
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
    setData(rawData);
  }, [query.data]);

  return { ...query, data };
};

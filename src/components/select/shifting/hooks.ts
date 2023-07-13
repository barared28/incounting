import { getShiftSchedule } from "@/services/shift-schedules";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

const useOptionShifting = () => {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const query = useQuery(["shifting-options"], async (params) =>
    getShiftSchedule(params)
  );
  useEffect(() => {
    query.refetch();
  }, [search]);
  useEffect(() => {
    const rawData =
      query.data?.data?.map((val: any) => ({
        label: `${val?.name}`,
        value: val?.id || "",
      })) || [];
    setData(rawData);
  }, [query.data]);
  return {
    ...query,
    data,
    setSearch,
  };
};

export default useOptionShifting;

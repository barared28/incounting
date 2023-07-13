import { getShiftSchedule } from "@/services/shift-schedules";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface IPropsData {
  page: number;
  limit: number;
}

const useDataShiftSchedule = (props: IPropsData) => {
  const { page, limit } = props;
  const [search, setSearch] = useState("");
  const payload: any = {
    page,
    limit,
  };
  if (search) payload.name = search;
  const query = useQuery(["shift-schedule"], async () =>
    getShiftSchedule(payload)
  );
  useEffect(() => {
    query.refetch();
  }, [page, limit, search]);
  return { ...query, setSearch };
};

export default useDataShiftSchedule;

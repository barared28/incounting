import { useEffect, useState } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { IDepartmentResponse, getDepartment } from "@/services/department";

interface IPropsData {
  page: number;
  limit: number;
}

type TResponse = UseQueryResult<IDepartmentResponse, any> & {
  setSearch: (search: string) => void;
};

const useDataDepartment = (props: IPropsData): TResponse => {
  const [search, setSearch] = useState("");
  const { page = 1, limit = 10 } = props;
  const payload: any = {
    page,
    limit,
  };
  if (search) payload.name = search;
  const query = useQuery(["department"], async () => getDepartment(payload));
  useEffect(() => {
    query.refetch();
  }, [page, limit, search]);
  return {
    ...query,
    setSearch,
  };
};

export default useDataDepartment;

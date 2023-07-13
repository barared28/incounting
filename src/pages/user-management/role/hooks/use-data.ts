import { IRoleResponse, getRole } from "@/services/role";
import { UseQueryResult, useQuery } from "react-query";
import { useEffect, useState } from "react";

interface IPropsData {
  page: number;
  limit: number;
}

const useDataRole = (
  props: IPropsData
): UseQueryResult<IRoleResponse, any> & { setName: (val: string) => void } => {
  const { page = 1, limit = 10 } = props;
  const [name, setName] = useState<string>("");
  const payload: any = {
    page,
    limit,
  };
  if (name) {
    payload.search = `display_name:${name}`;
  }
  const query = useQuery(["role"], async () => getRole(payload));
  useEffect(() => {
    query.refetch();
  }, [page, limit, name]);
  return { ...query, setName };
};

export default useDataRole;

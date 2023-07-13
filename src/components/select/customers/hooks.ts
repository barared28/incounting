import { useEffect } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { getContact } from "@/services/contact";

interface IPropsData {
  search: string;
  type: number;
}

export const useOptionCustomers = (
  props: IPropsData
): UseQueryResult<any, any> => {
  const { search, type } = props;
  const payload: any = { page: 1, limit: 5, type };
  if (search) payload.name = search;
  const query = useQuery(["customer-options"], async () => getContact(payload));

  useEffect(() => {
    query.refetch();
  }, [search]);

  return query;
};

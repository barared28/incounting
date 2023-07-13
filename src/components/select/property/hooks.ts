import { IPropertyResponse, getProperty } from "@/services/property";
import { useEffect } from "react";
import { UseQueryResult, useQuery } from "react-query";

interface IPropsData {
  search: string;
}

export const useOptionProperty = (
  props: IPropsData
): UseQueryResult<IPropertyResponse, any> => {
  const { search } = props;
  const payload: any = { page: 1, limit: 5, include: "category" };
  if (search) payload.search = `name:${search}`;
  const query = useQuery(["property-option"], async () => getProperty(payload));

  useEffect(() => {
    query.refetch();
  }, [search]);

  return query;
};

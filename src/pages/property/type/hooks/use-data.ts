import {
  IPropertyTypeResponse,
  getPropertyType,
} from "@/services/property-type";
import { useEffect } from "react";
import { UseQueryResult, useQuery } from "react-query";

interface IPropsData {
  page: number;
  limit: number;
}

const useDataPropertyType = (
  props: IPropsData
): UseQueryResult<IPropertyTypeResponse, any> => {
  const { page = 1, limit = 10 } = props;
  const query = useQuery(["property-type"], async () =>
    getPropertyType({ page, limit, include: "division,business" })
  );
  useEffect(() => {
    query.refetch();
  }, [page, limit]);
  return query;
};

export default useDataPropertyType;

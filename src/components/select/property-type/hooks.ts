import {
  IPropertyTypeResponse,
  getPropertyType,
} from "@/services/property-type";
import { UseQueryResult, useQuery } from "react-query";

interface IPropsData {
  search: string;
}

export const useOptionPropertyType = (
  props: IPropsData
): UseQueryResult<IPropertyTypeResponse, any> => {
  const { search } = props;
  const payload: any = { page: 1, limit: 5 };
  if (search) payload.search = `name:${search}`;
  const query = useQuery(["property-type-option"], async () =>
    getPropertyType(payload)
  );
  return query;
};

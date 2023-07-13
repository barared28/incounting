import { IContactResponse, getContact } from "@/services/contact";
import { useEffect, useState } from "react";
import { UseQueryResult, useQuery } from "react-query";

interface IPropsData {
  page: number;
  limit: number;
  type: string;
  search: string;
}

export const useDataContact = (
  props: IPropsData
): UseQueryResult<IContactResponse, any> => {
  const { page = 1, limit = 10, type, search } = props;

  const payload: any = {
    page,
    limit,
  };

  if (type) payload.type = +type;
  if (search) payload.name = search;

  const query = useQuery(["contact"], async () => getContact(payload));

  useEffect(() => {
    query.refetch();
  }, [page, limit, type, search]);

  return query;
};

export const useFilterContact = () => {
  const [type, setType] = useState<string>("5");
  const [search, setSearch] = useState<string>("");
  return {
    filterType: type,
    filterSearch: search,
    setFilterType: setType,
    setFilterSearch: setSearch,
  };
};

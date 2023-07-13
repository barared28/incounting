import {
  IBookingSourceResponse,
  getBookingSource,
} from "@/services/booking-source";
import { useState, useEffect } from "react";
import { UseQueryResult, useQuery } from "react-query";

interface IPropsData {
  page: number;
  limit: number;
}

type TResponse = UseQueryResult<IBookingSourceResponse, any> & {
  setSearch: (search: string) => void;
};

const useDataBookingSource = (props: IPropsData): TResponse => {
  const [search, setSearch] = useState("");
  const { page = 1, limit = 10 } = props;
  const payload: any = {
    page,
    limit,
  };
  if (search) payload.company_name = search;
  const query = useQuery(["booking-source"], async () =>
    getBookingSource(payload)
  );
  useEffect(() => {
    query.refetch();
  }, [page, limit, search]);
  return {
    ...query,
    setSearch,
  };
};

export default useDataBookingSource;

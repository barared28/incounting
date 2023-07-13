import {
  IParamsDailySalesReport,
  getDailySalesReport,
} from "@/services/daily-sales-report";
import { useQuery } from "react-query";
import { useEffect } from "react";

const useDataDailySalesReport = (params: IParamsDailySalesReport) => {
  const query = useQuery(["daily-sales-report"], async () =>
    getDailySalesReport(params)
  );

  useEffect(() => {
    query.refetch();
  }, [params]);

  return query;
};

export default useDataDailySalesReport;

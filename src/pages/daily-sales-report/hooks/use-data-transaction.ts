import { getDetailDailySalesReport } from "@/services/daily-sales-report";
import { useEffect } from "react";
import { useQuery } from "react-query";

const useDataTransaction = (type: string, date: string) => {
  const query = useQuery(["daily-sales-report-detail-transaction"], async () =>
    getDetailDailySalesReport(type, { date })
  );

  useEffect(() => {
    query.refetch();
  }, [date, type]);

  return query;
};

export default useDataTransaction;

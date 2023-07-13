import { getDetailTransactionDailySalesReport } from "@/services/daily-sales-report";
import { useEffect } from "react";
import { useQuery } from "react-query";

const useDataTransactionDetails = (
  type: string,
  id: number,
  params?: { page: number; limit: number }
) => {
  const payload = {
    page: params?.page || 1,
    limit: params?.limit || 10,
  };
  const query = useQuery(
    ["daily-sales-report-detail-transaction", "details", type, id],
    async () => getDetailTransactionDailySalesReport(type, payload, id)
  );

  useEffect(() => {
    query.refetch();
  }, [id, params, type]);

  return query;
};

export default useDataTransactionDetails;

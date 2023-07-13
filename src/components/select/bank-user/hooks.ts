import { getBank } from "@/services/bank";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const useOptionBankUser = (contactId: number, search: string) => {
  const [data, setData] = useState<any>([]);
  const payload: any = { page: 1, limit: 5, contact_id: contactId };
  if (search) payload.name = search;
  const query = useQuery(["bank-user-option", contactId], async () =>
    getBank(payload)
  );

  useEffect(() => {
    query.refetch();
  }, [search, contactId]);

  useEffect(() => {
    const rawData =
      query.data?.data?.map((val) => ({
        label: `${val?.account_name} - ${val?.account_number}`,
        name: val?.account_name || "",
        number: val?.account_number || "",
        value: val?.id || "",
      })) || [];
    setData(rawData);
  }, [query.data]);

  return { ...query, data };
};

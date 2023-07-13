import { IAccountListResponse, getAccountList } from "@/services/account-list";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { UseQueryResult, useQuery } from "react-query";

interface IReturn {
  query: UseQueryResult<IAccountListResponse, any>;
  search: string;
  setSearch: (value: string) => void;
  dataOption: any[];
  setDataOption: (value: any[]) => void;
}

export const useOptionAccountList = (): IReturn => {
  const [search, setSearch] = useState("");
  const [dataOption, setDataOption] = useState<any[]>([]);
  const { i18n } = useTranslation();
  const payload: any = { page: 1, limit: 5 };
  if (search) payload.name = search;
  const query = useQuery(["account-list-option"], async () =>
    getAccountList(payload)
  );

  useEffect(() => {
    if (query.data) {
      const res = query.data?.data?.map((item: any) => {
        const name = i18n.language === "id-ID" ? item?.id_name : item?.en_name;
        return {
          value: String(item?.id),
          label: name,
          name,
          code: item?.account_code,
        };
      });
      setDataOption(res);
    } else {
      setDataOption([]);
    }
  }, [query.data, i18n.language]);

  useEffect(() => {
    query.refetch();
  }, [search]);

  return {
    query,
    search,
    setSearch,
    dataOption,
    setDataOption,
  };
};

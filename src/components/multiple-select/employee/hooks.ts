import { getContact } from "@/services/contact";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

const useCustomHookMultipleSelectEmployee = () => {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const payload: any = { page: 1, limit: 10, type: 3 };
  if (search) payload.name = search;
  const query = useQuery(["employee-options"], async () => getContact(payload));

  useEffect(() => {
    query.refetch();
  }, [search]);

  useEffect(() => {
    if (query.data) {
      const res = query?.data?.data?.map((item: any) => ({
        value: item?.id,
        label: item?.name,
      }));
      const findRest =
        selected?.filter((item) => {
          const itemFind = res?.find((i) => i?.value === item?.value);
          return !itemFind;
        }) || [];
      res?.push(...findRest);
      setData(res);
    }
  }, [query.data, selected]);

  const handleChangeSelect = (value: string[]) => {
    const res = value.map((item) => {
      const itemFind = data?.find((i) => i.value === item);
      return itemFind;
    });
    setSelected(res);
  };

  return {
    ...query,
    data,
    setSearch,
    handleChangeSelect,
  };
};

export default useCustomHookMultipleSelectEmployee;

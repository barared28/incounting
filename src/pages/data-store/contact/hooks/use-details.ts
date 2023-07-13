import { getContactById } from "@/services/contact";
import { useEffect } from "react";
import { useQuery } from "react-query";

const useDetails = (id: string) => {
  const query = useQuery(["contact", id], async () =>
    id ? getContactById(id) : {}
  );

  useEffect(() => {
    query.refetch();
  }, [id]);

  return query;
};

export default useDetails;

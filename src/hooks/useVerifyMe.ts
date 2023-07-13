import { UseQueryResult, useQuery } from "react-query";
import { meService } from "@/services/login";

const useVerifyMe = (token: string): UseQueryResult<any, any> => {
  const location = window.location.pathname;
  const onVerify = location === "/verify";
  const query = useQuery(
    ["user"],
    () => {
      if (!token || token === "" || onVerify) return () => {};
      return meService();
    },
    {
      staleTime: 60000,
    }
  );
  return query;
};

export default useVerifyMe;

import { getBusinessSetting } from "@/services/business";
import { useQuery } from "react-query";

const useDataBussinessSetting = () => {
  const query = useQuery(["business-setting"], async () =>
    getBusinessSetting()
  );
  return query;
};

export default useDataBussinessSetting;

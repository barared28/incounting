import { updateBusinessSetting } from "@/services/business";
import { useMutation, useQueryClient } from "react-query";

const useSaveBusinessSetting = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((payload) =>
    updateBusinessSetting(payload)
  );

  const handleSave = (payload: any, callback: any) => {
    mutate(payload, {
      onSuccess: () => {
        if (callback) {
          callback();
        }
        queryClient.invalidateQueries("business-setting");
      },
    });
  };

  return { handleSave, loading: isLoading };
};

export default useSaveBusinessSetting;

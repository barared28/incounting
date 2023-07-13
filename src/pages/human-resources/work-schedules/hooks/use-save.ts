import { createWorkSchedule } from "@/services/work-schedules";
import { useMutation, useQueryClient } from "react-query";

interface IPropsSave {
  payload: any;
  callback?: any;
  id?: any;
}

const useSaveWorkSchedule = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((payload) =>
    createWorkSchedule(payload)
  );

  const handleSave = (props: IPropsSave) => {
    const { payload, callback, id = "work-schedules-calendar" } = props;
    mutate(payload, {
      onSuccess: () => {
        callback();
        queryClient.invalidateQueries(id);
      },
    });
  };

  return { handleSave, loading: isLoading };
};

export default useSaveWorkSchedule;

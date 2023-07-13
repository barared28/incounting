import {
  createShiftSchedule,
  updateShiftSchedule,
} from "@/services/shift-schedules";
import { TPageDialogType } from "@/types";
import { useMutation, useQueryClient } from "react-query";

interface IPropsSave {
  payload: any;
  id?: number;
  type: TPageDialogType;
  callback?: any;
}

const useSaveShiftSchedule = () => {
  const queryClient = useQueryClient();
  const { mutate: mutateCreate, isLoading: isLoadingCreate } = useMutation(
    (payload) => createShiftSchedule(payload)
  );
  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useMutation(
    ({ payload, id }: any) => updateShiftSchedule(payload, id)
  );
  const handleSave = (props: IPropsSave) => {
    const { type, payload, callback, id } = props;
    if (type === "create") {
      mutateCreate(payload, {
        onSuccess: () => {
          callback();
          queryClient.invalidateQueries("shift-schedule");
        },
      });
    } else if (type === "update") {
      mutateUpdate(
        { payload, id },
        {
          onSuccess: () => {
            callback();
            queryClient.invalidateQueries("shift-schedule");
          },
        }
      );
    }
  };

  return { handleSave, loading: isLoadingCreate || isLoadingUpdate };
};

export default useSaveShiftSchedule;

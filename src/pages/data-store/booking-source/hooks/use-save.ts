import {
  createBookingSource,
  updateBookingSource,
} from "@/services/booking-source";
import { TPageDialogType } from "@/types";
import { useMutation, useQueryClient } from "react-query";

interface IPropsSave {
  payload: any;
  id?: number;
  type: TPageDialogType;
  callback?: any;
}

const useSaveBookingSource = () => {
  const queryClient = useQueryClient();
  const { mutate: mutateCreate, isLoading: isLoadingCreate } = useMutation(
    (payload) => createBookingSource(payload)
  );
  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useMutation(
    ({ payload, id }: any) => updateBookingSource(payload, id)
  );

  const handleSave = (props: IPropsSave) => {
    const { type, payload, callback, id } = props;
    if (type === "create") {
      mutateCreate(payload, {
        onSuccess: () => {
          callback();
          queryClient.invalidateQueries("booking-source");
        },
      });
    } else if (type === "update") {
      mutateUpdate(
        { payload, id },
        {
          onSuccess: () => {
            callback();
            queryClient.invalidateQueries("booking-source");
          },
        }
      );
    }
  };

  return { handleSave, loading: isLoadingCreate || isLoadingUpdate };
};

export default useSaveBookingSource;

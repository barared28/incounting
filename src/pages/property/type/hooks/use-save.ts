import {
  createPropertyType,
  updatePropertyType,
} from "@/services/property-type";
import { TPageDialogType } from "@/types";
import { useMutation, useQueryClient } from "react-query";

interface IPropsSave {
  payload: any;
  id?: number;
  type: TPageDialogType;
  callback?: any;
}

const useSavePropertyType = () => {
  const queryClient = useQueryClient();
  const { mutate: mutateCreate, isLoading: isLoadingCreate } = useMutation(
    (payload: any) => {
      return createPropertyType(payload);
    }
  );
  const { mutate: mutateSave, isLoading: isLoadingSave } = useMutation(
    ({ payload, id }: any) => {
      return updatePropertyType(payload, id);
    }
  );

  const handleSave = (props: IPropsSave) => {
    const { type, id, payload, callback } = props;
    const formData: any = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });
    if (type === "create") {
      mutateCreate(formData, {
        onSuccess: () => {
          callback();
          queryClient.invalidateQueries("property-type");
        },
      });
    } else if (type === "update") {
      mutateSave(
        { payload: formData, id },
        {
          onSuccess: () => {
            callback();
            queryClient.invalidateQueries("property-type");
          },
        }
      );
    }
  };

  return { handleSave, loading: isLoadingCreate || isLoadingSave };
};

export default useSavePropertyType;

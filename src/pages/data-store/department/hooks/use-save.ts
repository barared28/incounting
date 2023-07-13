import { createDepartment, updateDepartment } from "@/services/department";
import { TPageDialogType } from "@/types";
import { useMutation, useQueryClient } from "react-query";

interface IPropsSave {
  payload: any;
  id?: number;
  type: TPageDialogType;
  callback?: any;
}

const useSaveDepartment = () => {
  const queryClient = useQueryClient();
  const { mutate: mutateCreate, isLoading: isLoadingCreate } = useMutation(
    (payload) => createDepartment(payload)
  );
  const { mutate: mutateSave, isLoading: isLoadingSave } = useMutation(
    ({ payload, id }: any) => updateDepartment(payload, id)
  );

  const handleSave = (props: IPropsSave) => {
    const { type, id, payload, callback } = props;
    if (type === "create") {
      mutateCreate(payload, {
        onSuccess: () => {
          callback();
          queryClient.invalidateQueries("department");
        },
      });
    } else if (type === "update") {
      mutateSave(
        { payload, id },
        {
          onSuccess: () => {
            callback();
            queryClient.invalidateQueries("department");
          },
        }
      );
    }
  };

  return { handleSave, loading: isLoadingCreate || isLoadingSave };
};

export default useSaveDepartment;

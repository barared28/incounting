import { createRole, updateRole } from "@/services/role";
import { TPageDialogType } from "@/types";
import { useMutation, useQueryClient } from "react-query";

interface IPropsSave {
  payload: any;
  id?: number;
  type: TPageDialogType;
  callback?: any;
}

const useSaveRole = () => {
  const queryClient = useQueryClient();
  const { mutate: mutateCreate, isLoading: isLoadingCreate } = useMutation(
    (payload: any) => {
      return createRole(payload);
    }
  );
  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useMutation(
    ({ payload, id }: any) => {
      return updateRole(payload, id);
    }
  );

  const handleSave = (props: IPropsSave) => {
    const { type, id, payload, callback } = props;
    const formData: any = new FormData();
    Object.keys(payload).forEach((key) => {
      if (key === "access") {
        payload[key].forEach((item: any, index: number) => {
          Object.keys(item).forEach((keyItem) => {
            formData.append(`accesses[${index}].${keyItem}`, item[keyItem]);
          });
        });
        return;
      }
      formData.append(key, payload[key]);
    });
    if (type === "create") {
      mutateCreate(formData, {
        onSuccess: () => {
          callback();
          queryClient.invalidateQueries("role");
        },
      });
    } else if (type === "update") {
      mutateUpdate(
        { payload: formData, id },
        {
          onSuccess: () => {
            callback();
            queryClient.invalidateQueries("role");
          },
        }
      );
    }
  };

  return { handleSave, loading: isLoadingCreate || isLoadingUpdate };
};

export default useSaveRole;

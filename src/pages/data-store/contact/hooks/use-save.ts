import { createContact, updateContact } from "@/services/contact";
import { TPageDialogType } from "@/types";
import { useMutation, useQueryClient } from "react-query";

interface IPropsSave {
  payload: any;
  id?: number;
  type: TPageDialogType;
  callback?: any;
}

const useSaveContact = () => {
  const queryClient = useQueryClient();
  const { mutate: mutateCreate, isLoading: isLoadingCreate } = useMutation(
    (payload) => createContact(payload)
  );
  const { mutate: mutateUpdate, isLoading: isLoadingSave } = useMutation(
    ({ payload, id }: any) => updateContact(payload, id)
  );

  const handleSave = (props: IPropsSave) => {
    const { type, id, payload, callback } = props;
    if (type === "create") {
      mutateCreate(payload, {
        onSuccess: () => {
          callback();
          queryClient.invalidateQueries("contact");
        },
      });
    } else if (type === "update") {
      mutateUpdate(
        { payload, id },
        {
          onSuccess: () => {
            callback();
            queryClient.invalidateQueries("contact");
          },
        }
      );
    }
  };

  return { handleSave, loading: isLoadingCreate || isLoadingSave };
};

export default useSaveContact;

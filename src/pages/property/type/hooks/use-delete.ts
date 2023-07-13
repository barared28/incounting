import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQueryClient } from "react-query";
import { deletePropertyType } from "@/services/property-type";

const useDeletePropertyType = () => {
  const [id, setId] = useState<number>(0);
  const [opened, { close, open }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((id: number) => {
    return deletePropertyType(id);
  });

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries("property-type");
        setId(0);
        close();
      },
    });
  };

  const handleOpen = (id: number) => {
    setId(id);
    open();
  };

  return { handleDelete, loading: isLoading, setId, opened, close, handleOpen };
};

export default useDeletePropertyType;

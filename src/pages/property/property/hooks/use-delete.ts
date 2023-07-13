import { deleteProperty } from "@/services/property";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const useDeleteProperty = () => {
  const [id, setId] = useState<number>(0);
  const [opened, { close, open }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((id: number) => {
    return deleteProperty(id);
  });

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries("property");
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

export default useDeleteProperty;

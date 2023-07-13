import { deleteRole } from "@/services/role";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const useDeleteRole = () => {
  const [id, setId] = useState<number>(0);
  const [opened, { close, open }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((id: number) => {
    return deleteRole(id);
  });

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries("role");
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

export default useDeleteRole;

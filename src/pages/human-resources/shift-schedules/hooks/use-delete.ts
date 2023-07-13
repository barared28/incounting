import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQueryClient } from "react-query";
import { deleteShiftSchedule } from "@/services/shift-schedules";

const useDeleteShiftSchedule = () => {
  const [id, setId] = useState(0);
  const [opened, { close, open }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((id: number) =>
    deleteShiftSchedule(id)
  );
  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries("shift-schedule");
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

export default useDeleteShiftSchedule;

import { deletePaymentSchedule } from "@/services/payment-schedule";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const useDeletePaymentSchedule = () => {
  const [id, setId] = useState<number>(0);
  const [opened, { close, open }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((id: number) => {
    return deletePaymentSchedule(id);
  });

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries("payment-schedule");
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

export default useDeletePaymentSchedule;

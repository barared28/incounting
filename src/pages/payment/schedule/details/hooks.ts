import { createBank } from "@/services/bank";
import { approvalPaymentSchedule } from "@/services/payment-schedule";
import {
  detailPaymentSchedule,
  postponePaymentSchedule,
} from "@/services/payment-schedule";
import { useForm, yupResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import * as Yup from "yup";

interface IPropsData {
  id: number;
  page: number;
  limit: number;
}

interface IResponseData {
  query: UseQueryResult<any, any>;
  setStatus: (status: string) => void;
}

export const useDataPaymentScheduleDetails = (
  props: IPropsData
): IResponseData => {
  const { id, page, limit } = props;
  const [status, setStatus] = useState<string>("");
  const payload: any = {
    page,
    limit,
  };

  if (status) payload["status"] = status;

  const query = useQuery(["payment-schedule-details", id], async () =>
    detailPaymentSchedule(id, payload)
  );

  useEffect(() => {
    query.refetch();
  }, [page, limit, status, id]);

  return {
    query,
    setStatus,
  };
};

export const useModalPaymentScheduleDetails = () => {
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [showPostpone, setShowPostpone] = useState<boolean>(false);
  const [showReminder, setShowReminder] = useState<boolean>(false);
  const [showConfirmUpload, setShowConfirmUpload] = useState<boolean>(false);
  const [showAddBank, setShowAddBank] = useState<boolean>(false);

  const handleShowAddBank = () => {
    setShowUpload(false);
    setShowAddBank(true);
  };

  const handleCloseAddBank = () => {
    setShowAddBank(false);
    setShowUpload(true);
  };

  return {
    showUpload,
    setShowUpload,
    showPostpone,
    setShowPostpone,
    showReminder,
    setShowReminder,
    showConfirmUpload,
    setShowConfirmUpload,
    showAddBank,
    handleShowAddBank,
    handleCloseAddBank,
  };
};

export const useActionPaymentScheduleDetails = () => {
  const [selectedId, setSelectedId] = useState<number>(0);

  return {
    selectedId,
    setSelectedId,
  };
};

export const usePostponePaymentScheduleDetails = (idPayment: number) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((id: number) =>
    postponePaymentSchedule(id)
  );

  const handlePostpone = (callback: () => void) => {
    mutate(idPayment, {
      onSuccess: () => {
        queryClient.invalidateQueries(["payment-schedule-details", idPayment]);
        if (callback) callback();
      },
    });
  };

  return {
    handlePostpone,
    isLoading,
  };
};

export const useApprovePaymentScheduleDetails = (id: number) => {
  const { t } = useTranslation();
  const schema = Yup.object({
    image_payment_proof: Yup.string(),
  });
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((id: number) =>
    approvalPaymentSchedule(id)
  );

  const handleApprove = (callback: () => void) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["payment-schedule-details", id]);
        if (callback) callback();
      },
    });
  };

  return {
    handleApprove,
    loading: isLoading,
  };
};

export const useAddBankUser = (id: number, opened: boolean) => {
  const { t } = useTranslation();
  const schema = Yup.object({
    bank_category_id: Yup.string().required(
      t("required", { key: "Bank Category" }) || ""
    ),
    branch_office: Yup.string().required(
      t("required", { key: "Branch Office" }) || ""
    ),
    account_name: Yup.string().required(
      t("required", { key: "Account Name" }) || ""
    ),
    account_number: Yup.string().required(
      t("required", { key: "Account Number" }) || ""
    ),
  });
  const form = useForm({
    initialValues: {
      bank_category_id: "",
      branch_office: "",
      account_name: "",
      account_number: "",
    },
    validate: yupResolver(schema),
  });

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((payload: any) =>
    createBank(payload)
  );

  const handleAddBank = (callback: () => void) => {
    mutate(
      {
        ...form.values,
        contact_id: id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["payment-schedule-details", id]);
          if (callback) callback();
        },
      }
    );
  };

  useEffect(() => {
    form.reset();
  }, [opened]);

  return {
    form,
    handleAddBank,
    loading: isLoading,
  };
};

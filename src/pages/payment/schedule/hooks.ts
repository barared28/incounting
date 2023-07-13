import {
  IPaymentScheduleResponse,
  createPaymentSchedule,
  getPaymentSchedule,
} from "@/services/payment-schedule";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

interface IPropsData {
  page: number;
  limit: number;
  name?: string;
  rangeDate?: string[];
}

export const useDataPaymentSchedule = (
  props: IPropsData
): UseQueryResult<IPaymentScheduleResponse, any> => {
  const { page, limit, name, rangeDate } = props;
  const payload: any = { page, limit };
  if (name) payload.name = name;
  if (rangeDate && rangeDate.length > 1 && rangeDate[0] && rangeDate[1]) {
    payload.start_date = moment(rangeDate[0]).format("YYYY-MM-DD");
    payload.end_date = moment(rangeDate[1]).format("YYYY-MM-DD");
  }
  const query = useQuery(["payment-schedule"], async () =>
    getPaymentSchedule(payload)
  );

  useEffect(() => {
    query.refetch();
  }, [page, limit, name, rangeDate]);

  return query;
};

interface IPropsSave {
  payload: any;
  callback?: any;
}

export const useCreatePaymentSchedule = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((payload) =>
    createPaymentSchedule(payload)
  );

  const handleCreate = (props: IPropsSave) => {
    const { payload, callback } = props;
    mutate(payload, {
      onSuccess: () => {
        callback();
        queryClient.invalidateQueries("payment-schedule");
      },
    });
  };

  return { handleCreate, loading: isLoading };
};

export const useDetailsPaymentSchedule = () => {
  const [id, setId] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleShow = (id: number) => {
    setId(id);
    setVisible(true);
  };

  const handleHide = () => {
    setId(0);
    setVisible(false);
  };

  return { id, visible, handleShow, handleHide };
};

export const useFilterPaymentSchedule = () => {
  const [name, setName] = useState("");
  const [rangeDate, setRangeDate] = useState<string[]>([]);

  const handleChangeRangeDate = (start: string, end: string) => {
    setRangeDate([start, end]);
  };

  return {
    name,
    setName,
    rangeDate,
    setRangeDate,
    handleChangeRangeDate,
  };
};

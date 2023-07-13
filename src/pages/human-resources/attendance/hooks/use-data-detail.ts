import { getAttendanceDetail } from "@/services/attendance";
import moment from "moment";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

interface IPropsData {
  page: number;
  limit: number;
  id: number;
  start: string;
  end: string;
}

const useDataAttendanceDetail = (props: IPropsData) => {
  const { page, limit, id, start, end } = props;
  const [start_date, setStartDate] = useState<string>(
    start || moment().startOf("month").format("YYYY-MM-DD")
  );
  const [end_date, setEndDate] = useState<string>(
    end || moment().format("YYYY-MM-DD")
  );
  const query = useQuery(["attendance-detail", id], async () =>
    getAttendanceDetail(id, {
      page,
      limit,
      start_date,
      end_date,
    })
  );
  useEffect(() => {
    query.refetch();
  }, [page, limit, start_date, end_date, id]);
  const handleChangedDate = (start: any, end: any) => {
    setStartDate(moment(start).format("YYYY-MM-DD"));
    setEndDate(moment(end).format("YYYY-MM-DD"));
  };
  return {
    ...query,
    handleChangedDate,
    startDate: start_date,
    endDate: end_date,
  };
};

export default useDataAttendanceDetail;

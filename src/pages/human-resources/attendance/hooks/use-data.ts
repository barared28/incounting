import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAttendance } from "@/services/attendance";
import moment from "moment";

interface IPropsData {
  page: number;
  limit: number;
}

const useDataAttendance = (props: IPropsData) => {
  const { page = 1, limit = 10 } = props;
  const [start_date, setStartDate] = useState<string>(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [end_date, setEndDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const [contact_id, setContactId] = useState<string>("");
  const payload: any = {
    page,
    limit,
    start_date,
    end_date,
  };
  if (contact_id) {
    payload["contact_id"] = contact_id;
  }
  const query = useQuery(["attendance"], async () => getAttendance(payload));
  useEffect(() => {
    query.refetch();
  }, [page, limit, start_date, end_date, contact_id]);
  const handleChangedDate = (start: any, end: any) => {
    setStartDate(moment(start).format("YYYY-MM-DD"));
    setEndDate(moment(end).format("YYYY-MM-DD"));
  };
  return {
    ...query,
    handleChangedDate,
    startDate: start_date,
    endDate: end_date,
    setContactId,
  };
};

export default useDataAttendance;

import {
  getWorkScheduleCalendar,
  getWorkScheduleTimeline,
} from "@/services/work-schedules";
import moment from "moment";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface IPropsDataCalendar {
  year: number | string;
  month: number | string;
}

export const useDataWorkSchedulesCalendar = (props: IPropsDataCalendar) => {
  const { month, year } = props;
  const [shifting_id, setShiftingId] = useState("");
  const payload: any = {
    month,
    year,
  };
  if (shifting_id) payload.shifting_id = shifting_id;
  const query = useQuery(["work-schedules-calendar"], async () =>
    getWorkScheduleCalendar(payload)
  );
  useEffect(() => {
    query.refetch();
  }, [month, year, shifting_id]);
  return { ...query, setShiftingId };
};

interface IPropsDataTimeline {
  page: number;
  limit: number;
}

export const useDataWorkSchedulesTimeline = (props: IPropsDataTimeline) => {
  const { page, limit } = props;
  const [start_date, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [end_date, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );
  const [division_id, setDivisionId] = useState("");
  const [contact_id, setContactId] = useState("");
  const payload: any = {
    page,
    limit,
  };
  if (start_date && end_date) {
    payload.start_date = start_date;
    payload.end_date = end_date;
  }
  if (division_id) payload.division_id = division_id;
  if (contact_id) payload.contact_id = contact_id;
  const query = useQuery(["work-schedules-timeline"], async () =>
    getWorkScheduleTimeline(payload)
  );
  useEffect(() => {
    query.refetch();
  }, [page, limit, start_date, end_date, division_id, contact_id]);
  const handleChangeDate = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };
  return {
    ...query,
    handleChangeDate,
    setDivisionId,
    setContactId,
  };
};

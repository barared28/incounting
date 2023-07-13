import { IPaginationResponse } from "@/types";
import fetch from "@/utils/fetch";

export interface IDataWorkScheduleCalendar {}

export const getWorkScheduleCalendar = async (
  params: any
): Promise<IDataWorkScheduleCalendar[]> => {
  try {
    const res = await fetch({
      path: "admin/hr/schedules/shiftings",
      method: "get",
      params,
    });
    return res?.data || [];
  } catch {}
  return [];
};

export const createWorkSchedule = async (payload: any) => {
  try {
    const res = await fetch({
      path: "admin/hr/schedules",
      method: "post",
      payload,
    });
    return res?.data;
  } catch {}
};

export interface IDataWorkScheduleTimeline {}

export interface IWorkScheduleTimelineResponse {
  data: IDataWorkScheduleTimeline[];
  pagination: IPaginationResponse;
}

export const getWorkScheduleTimeline = async (
  params: any
): Promise<IWorkScheduleTimelineResponse> => {
  try {
    const res = await fetch({
      path: "admin/hr/schedules/employees",
      method: "get",
      params,
    });
    return {
      data: res?.data || [],
      pagination: res?.meta?.pagination,
    };
  } catch {}
  return {
    data: [],
    pagination: {
      total: 0,
    },
  };
};

export const deleteWorkSchedule = async (params: any) => {
  try {
    const res = await fetch({
      path: "admin/hr/schedules",
      method: "delete",
      params,
    });
    return res?.data;
  } catch {}
};

export const getEmployeeWorkSchedule = async (params: any) => {
  try {
    const res = await fetch({
      path: "admin/hr/schedules/shifting",
      method: "get",
      params,
    });
    return res?.data;
  } catch {}
};

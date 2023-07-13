import { IPaginationResponse } from "@/types";
import fetch from "@/utils/fetch";

export interface IDataShiftSchedule {}

export interface IShiftScheduleResponse {
  data: IDataShiftSchedule[];
  pagination: IPaginationResponse;
}

export const getShiftSchedule = async (
  params: any
): Promise<IShiftScheduleResponse> => {
  try {
    const res = await fetch({
      path: "admin/hr/shifting",
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

export const createShiftSchedule = async (payload: any) => {
  try {
    const res = await fetch({
      path: "admin/hr/shifting",
      method: "post",
      payload,
    });
    return res?.data;
  } catch {}
};

export const updateShiftSchedule = async (payload: any, id: number) => {
  try {
    const res = await fetch({
      path: `admin/hr/shifting/${id}`,
      method: "put",
      payload,
    });
    return res?.data;
  } catch {}
};

export const deleteShiftSchedule = async (id: number) => {
  try {
    const res = await fetch({
      path: `admin/hr/shifting/${id}`,
      method: "delete",
    });
    return res?.data;
  } catch {}
};

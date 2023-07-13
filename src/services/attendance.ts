import { IPaginationResponse } from "@/types";
import fetch from "@/utils/fetch";

export interface IResponseDataAttendance {}

export interface IAttendanceResponse {
  data: IResponseDataAttendance[];
  pagination: IPaginationResponse;
}

export const getAttendance = async (
  params: any
): Promise<IAttendanceResponse> => {
  try {
    const res = await fetch({
      path: "admin/hr/attendance",
      method: "get",
      params,
    });
    const data =
      res?.data?.map((val: any, index: number) => ({
        ...val,
        no: index + 1 + ((params?.page - 1) * params?.limit || 0),
      })) || [];
    return {
      data,
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

export interface IResponseDataAttendanceDetail {}

export interface IAttendanceDetailResponse {
  data: IResponseDataAttendanceDetail[];
  pagination: IPaginationResponse;
}

export const getAttendanceDetail = async (
  id: number,
  params: any
): Promise<IAttendanceDetailResponse> => {
  try {
    const res = await fetch({
      path: `admin/hr/attendance/detail/${id}`,
      method: "get",
      params,
    });
    const data =
      res?.data?.map((val: any, index: number) => ({
        ...val,
        no: index + 1 + ((params?.page - 1) * params?.limit || 0),
      })) || [];
    return {
      data,
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

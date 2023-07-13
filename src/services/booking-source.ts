import { IPaginationResponse } from "@/types";
import fetch from "@/utils/fetch";

export interface IResponseBookingSource {}

export interface IBookingSourceResponse {
  data: IResponseBookingSource[];
  pagination: IPaginationResponse;
}

export const getBookingSource = async (
  params: any
): Promise<IBookingSourceResponse> => {
  try {
    const res = await fetch({
      path: "admin/booking-source",
      method: "get",
      params,
    });
    const data =
      res?.data?.map((item: any, index: number) => ({
        ...item,
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

export const createBookingSource = async (payload: any) => {
  try {
    const res = await fetch({
      path: "admin/booking-source",
      method: "post",
      payload,
    });
    return res?.data;
  } catch {}
};

export const updateBookingSource = async (payload: any, id: number) => {
  try {
    const res = await fetch({
      path: `admin/booking-source/${id}`,
      method: "put",
      payload,
    });
    return res?.data;
  } catch {}
};

export const deleteBookingSource = async (id: number) => {
  try {
    const res = await fetch({
      path: `admin/booking-source/${id}`,
      method: "delete",
    });
    return res?.data;
  } catch {}
};

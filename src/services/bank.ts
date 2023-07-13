import { IPaginationResponse } from "@/types";
import fetch from "@/utils/fetch";

export interface IBankResponse {
  data: any[];
  pagination: IPaginationResponse;
}

export const getBank = async (params: any): Promise<IBankResponse> => {
  try {
    const res = await fetch({
      path: "admin/bank",
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

export const createBank = async (payload: any): Promise<any> => {
  try {
    const res = await fetch({
      path: "admin/bank",
      method: "post",
      payload,
    });
    return res?.data;
  } catch {}
};

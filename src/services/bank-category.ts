import { IPaginationResponse } from "@/types";
import fetch from "@/utils/fetch";

export interface IBankCategoryResponse {
  data: any[];
  pagination: IPaginationResponse;
}

export const getBankCategory = async (
  params: any
): Promise<IBankCategoryResponse> => {
  try {
    const res = await fetch({
      path: "admin/bank-category",
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

import { IPaginationResponse } from "@/types";
import fetch from "@/utils/fetch";

export interface IResponseDataAccountList {}

export interface IAccountListResponse {
  data: IResponseDataAccountList[];
  pagination: IPaginationResponse;
}

export const getAccountList = async (
  params: any
): Promise<IAccountListResponse> => {
  try {
    const res = await fetch({
      path: "admin/account-list",
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

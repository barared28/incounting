import { IPaginationResponse } from "@/types";
import fetch from "@/utils/fetch";

export interface IResponseDataRole {
  id: number;
  name: string;
  accesses: {
    key: string;
    actions: string[];
  }[];
}

export interface IRoleResponse {
  data: IResponseDataRole[];
  pagination: IPaginationResponse;
}

export const getRole = async (params: any): Promise<IRoleResponse> => {
  try {
    const res = await fetch({
      path: "admin/roles",
      method: "get",
      params,
    });
    const resData =
      res?.data?.map((val: any, index: number) => ({
        ...val,
        no: index + 1 + (params?.page - 1) * params?.limit,
      })) || [];
    return {
      data: resData || [],
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

export const createRole = async (payload: any) => {
  try {
    const res = await fetch({
      path: "admin/roles",
      method: "post",
      payload,
      contentType: "multipart/form-data",
    });
    return res?.data;
  } catch {}
};

export const updateRole = async (payload: any, id: number) => {
  try {
    const res = await fetch({
      path: `admin/role/${id}`,
      method: "put",
      payload,
      contentType: "multipart/form-data",
    });
    return res?.data;
  } catch {}
};

export const deleteRole = async (id: number) => {
  try {
    const res = await fetch({
      path: `admin/role/${id}`,
      method: "delete",
    });
    return res?.data;
  } catch {}
};

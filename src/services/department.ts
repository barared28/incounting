import { IPaginationResponse } from "@/types";
import fetch from "@/utils/fetch";

export interface IResponseDataDepartment {
  id: number;
  name: string;
  created_at: string;
}

export interface IDepartmentResponse {
  data: IResponseDataDepartment[];
  pagination: IPaginationResponse;
}

interface IParamsGetDepartment {
  page: number;
  limit: number;
}

export const getDepartment = async (
  params: IParamsGetDepartment
): Promise<IDepartmentResponse> => {
  try {
    const res = await fetch({
      path: "admin/division",
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

export const createDepartment = async (payload: any) => {
  try {
    const res = await fetch({
      path: "admin/division",
      method: "post",
      payload,
    });
    return res?.data;
  } catch {}
};

export const updateDepartment = async (payload: any, id: number) => {
  try {
    const res = await fetch({
      path: `admin/division/${id}`,
      method: "put",
      payload,
    });
    return res?.data;
  } catch {}
};

export const deleteDepartment = async (id: number) => {
  try {
    const res = await fetch({
      path: `admin/division/${id}`,
      method: "delete",
    });
    return res?.data;
  } catch {}
};

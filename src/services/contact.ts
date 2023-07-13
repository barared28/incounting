import { IPaginationResponse } from "@/types";
import fetch from "@/utils/fetch";

export interface IResponseDataContact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface IContactResponse {
  data: IResponseDataContact[];
  pagination: IPaginationResponse;
}

export const getContact = async (params: any): Promise<IContactResponse> => {
  try {
    const res = await fetch({
      path: "admin/contact",
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

export const getContactById = async (id: string) => {
  try {
    const res = await fetch({
      path: `admin/contact/${id}`,
      method: "get",
    });
    return res?.data;
  } catch {}
};

export const createContact = async (payload: any) => {
  try {
    const res = await fetch({
      path: "admin/contact",
      method: "post",
      payload,
    });
    return res?.data;
  } catch {}
};

export const updateContact = async (payload: any, id: number) => {
  try {
    const res = await fetch({
      path: `admin/contact/${id}`,
      method: "put",
      payload,
    });
    return res?.data;
  } catch {}
};

export const deleteContact = async (id: number) => {
  try {
    const res = await fetch({
      path: `admin/contact/${id}`,
      method: "delete",
    });
    return res?.data;
  } catch {}
};

import { IPaginationResponse } from "@/types";
import fetch from "@/utils/fetch";

export interface IResponseDataProperty {
  name: string;
  code: string;
  type: {
    name: string;
    price: number;
    id: number;
  };
  id: number;
}

export interface IPropertyResponse {
  data: IResponseDataProperty[];
  pagination: IPaginationResponse;
}

export const getProperty = async (params: any): Promise<IPropertyResponse> => {
  try {
    const res = await fetch({
      path: "admin/properties",
      method: "get",
      params,
    });
    const data =
      res?.data?.map((val: any) => ({
        name: val?.name || "",
        code: val?.code || "",
        type: {
          name: val?.product_category?.name || "",
          price: val?.product_category?.price || 0,
          id: val?.product_category?.id || 0,
        },
        id: val?.id,
      })) || [];
    return {
      data: data,
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

export const createProperty = async (payload: any) => {
  try {
    const res = await fetch({
      path: "admin/properties",
      method: "post",
      payload,
      contentType: "multipart/form-data",
    });
    return res?.data;
  } catch {}
};

export const updateProperty = async (payload: any, id: number) => {
  try {
    const res = await fetch({
      path: `admin/properties/${id}`,
      method: "put",
      payload,
      contentType: "multipart/form-data",
    });
    return res?.data;
  } catch {}
};

export const deleteProperty = async (id: number) => {
  try {
    const res = await fetch({
      path: `admin/properties/${id}`,
      method: "delete",
    });
    return res?.data;
  } catch {}
};

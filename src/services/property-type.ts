import { IPaginationResponse } from "@/types";
import fetch from "@/utils/fetch";

export interface IResponseDataPropertyType {
  id: number;
  name: string;
  price: number;
}

export interface IPropertyTypeResponse {
  data: IResponseDataPropertyType[];
  pagination: IPaginationResponse;
}

export const getPropertyType = async (
  params: any
): Promise<IPropertyTypeResponse> => {
  try {
    const res = await fetch({
      path: "admin/property/types",
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

export const createPropertyType = async (payload: any) => {
  try {
    const res = await fetch({
      path: "admin/property/types",
      method: "post",
      payload,
      contentType: "multipart/form-data",
    });
    return res?.data;
  } catch {}
};

export const updatePropertyType = async (payload: any, id: number) => {
  try {
    const res = await fetch({
      path: `admin/property/type/${id}`,
      method: "put",
      payload,
      contentType: "multipart/form-data",
    });
    return res?.data;
  } catch {}
};

export const deletePropertyType = async (id: number) => {
  try {
    const res = await fetch({
      path: `admin/property/type/${id}`,
      method: "delete",
    });
    return res?.data;
  } catch {}
};

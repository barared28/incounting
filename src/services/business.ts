import { IPaginationResponse } from "@/types";
import fetch from "@/utils/fetch";

export interface IResponseDataBusiness {
  id: number;
  name: string;
  category: string;
  type: string;
  created_at: Date;
}
export interface IBusinessResponse {
  data: IResponseDataBusiness[];
  pagination: IPaginationResponse;
}

export const getOptionBusiness = async (
  params: any
): Promise<IBusinessResponse> => {
  try {
    const res = await fetch({
      path: "admin/user-businesses",
      method: "get",
      params,
    });
    const result: IResponseDataBusiness[] = res?.data
      ? res.data.map((val: any) => ({
          id: val?.id,
          name: val?.name || "",
          category: val?.type?.category || "",
          type: val?.type?.en_title || "",
          created_at: val?.created_at || null,
        }))
      : [];
    const pagination = res?.meta?.pagination || null;
    return {
      data: result,
      pagination: {
        page: pagination?.current_page,
        total: pagination?.total,
      },
    };
  } catch {}
  return {
    data: [],
    pagination: {
      total: 0,
    },
  };
};

export const selectBusiness = async (payload: any) => {
  try {
    const res = await fetch({
      path: "admin/selected-business",
      method: "post",
      payload,
      contentType: "multipart/form-data",
    });
    return res?.data;
  } catch {}
};

export interface IResponseDataBusinessSetting {}

export interface IBusinessSettingResponse {
  data: IResponseDataBusinessSetting[];
  pagination: IPaginationResponse;
}

export const getBusinessSetting = async () => {
  try {
    const res = await fetch({
      path: "admin/setting/company",
      method: "get",
    });
    return res?.data;
  } catch {}
};

export const getBusinessType = async () => {
  try {
    const res = await fetch({
      path: "admin/business/types",
      method: "get",
    });
    return res?.data;
  } catch {}
};

export const updateBusinessSetting = async (payload: any) => {
  try {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });
    const res = await fetch({
      path: "admin/setting/update-company",
      method: "put",
      payload: formData,
      contentType: "multipart/form-data",
    });
    return res?.data;
  } catch {}
};

import { IPaginationResponse } from "@/types";
import fetch from "@/utils/fetch";

export interface IResponseDataPaymentSchedule {}

export interface IPaymentScheduleResponse {
  data: IResponseDataPaymentSchedule[];
  pagination: IPaginationResponse;
}

export const getPaymentSchedule = async (
  params: any
): Promise<IPaymentScheduleResponse> => {
  try {
    const res = await fetch({
      path: "admin/payment-schedules",
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

export const createPaymentSchedule = async (payload: any) => {
  try {
    const res = await fetch({
      path: "admin/payment-schedules",
      method: "post",
      payload,
    });
    return res?.data;
  } catch {}
};

export const deletePaymentSchedule = async (id: number) => {
  try {
    const res = await fetch({
      path: `admin/payment-schedule/${id}`,
      method: "delete",
    });
    return res?.data;
  } catch {}
};

export interface IResponseDataPaymentScheduleDetails {
  id?: number;
  name?: string;
  amount?: number;
  payments?: any[];
}

export interface IPaymentScheduleDetailsResponse {
  data: IResponseDataPaymentScheduleDetails;
  pagination: IPaginationResponse;
}

export const detailPaymentSchedule = async (
  id: number,
  params: any
): Promise<IPaymentScheduleDetailsResponse> => {
  try {
    const res = await fetch({
      path: `admin/payment-schedule/${id}`,
      method: "get",
      params,
    });
    const data = {
      ...res?.data,
      payments: res?.data?.payments?.map((payment: any) => ({
        ...payment,
        name:
          payment?.type === "downpayment"
            ? `Down Payment ${payment?.count || ""}`
            : `Installment ${payment?.count || ""}`,
      })),
    };
    return {
      data,
      pagination: res?.meta?.pagination,
    };
  } catch {}
  return {
    data: {},
    pagination: {
      total: 0,
    },
  };
};

export const approvalPaymentSchedule = async (id: number) => {
  try {
    const res = await fetch({
      path: `admin/payment-schedule/${id}/approve`,
      method: "put",
    });
    return res?.data;
  } catch {}
};

export const reminderPaymentSchedule = async (id: number) => {
  try {
    const res = await fetch({
      path: `admin/payment-schedule/${id}/reminder`,
      method: "put",
    });
    return res?.data;
  } catch {}
};

export const postponePaymentSchedule = async (id: number) => {
  try {
    const res = await fetch({
      path: `admin/payment-schedule/${id}/postpone`,
      method: "put",
    });
    return res?.data;
  } catch {}
};

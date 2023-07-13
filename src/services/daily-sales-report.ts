import { IPaginationResponse } from "@/types";
import fetch from "@/utils/fetch";

interface IRoomStatistic {
  room_inventory: number;
  room_inventory_rate: number;
  out_of_order: number;
  out_of_order_rate: number;
  house_use: number;
  house_use_rate: number;
  block_room: number;
  block_room_rate: number;
  room_available: number;
  room_available_rate: number;
  room_sold: number;
  room_sold_amount: number;
  room_sold_rate: number;
  room_occupied: number;
  room_occupied_rate: number;
  total_amount: number;
}

interface IRoomRevenue {
  room_revenue: number;
  room_revenue_rate: number;
  ota_commission: number;
  ota_commission_rate: number;
  gross_revenue: number;
  gross_revenue_rate: number;
  total_net_revenue: number;
  total_net_revenue_rate: number;
}

interface IAverageRate {
  average_daily_rate: number;
  average_room_rate: number;
}

interface IDailySalesReport {
  room_revenue: number;
  food_revenue: number;
  ticket_revenue: number;
  locker_revenue: number;
  room_service_revenue: number;
  other_income: number;
  total_gross_revenue: number;
  total_net_revenue: number;
}

export interface IResponseDailySalesReport {
  daily: {
    room_statistic?: IRoomStatistic;
    room_revenue?: IRoomRevenue;
    average_rate?: IAverageRate;
    daily_sales_report: IDailySalesReport;
  };
  month_to_date?: {
    room_statistic?: IRoomStatistic;
    room_revenue?: IRoomRevenue;
    average_rate?: IAverageRate;
    daily_sales_report: IDailySalesReport;
  };
}

export interface IParamsDailySalesReport {
  date: string;
  room_statistic: boolean;
  room_revenue: boolean;
  average_rate: boolean;
  daily_sales_report: boolean;
  with_month: boolean;
}

export const getDailySalesReport = async (
  params: IParamsDailySalesReport
): Promise<IResponseDailySalesReport | null> => {
  try {
    const res = await fetch({
      path: "admin/daily-sales-report",
      method: "get",
      params,
    });
    return res?.data;
  } catch {}
  return null;
};

interface IResponseDetailDailySalesReport {
  data: any[];
  total: number;
  pagination: IPaginationResponse;
}

export const getDetailDailySalesReport = async (
  type: string,
  params: any
): Promise<IResponseDetailDailySalesReport> => {
  try {
    const res = await fetch({
      path: `admin/daily-sales-report/detail/${type}`,
      method: "get",
      params,
    });
    const dataArr =
      res?.data?.daily_sales_detail?.map((val: any, index: number) => ({
        ...val,
        no:
          index +
          1 +
          ((res?.data?.pagination?.page - 1) * res?.data?.pagination?.limit ||
            0),
      })) || [];
    const response = {
      data: dataArr,
      total: res?.data?.total,
      pagination: res?.data?.meta?.pagination,
    };
    return response;
  } catch {}
  return {
    data: [],
    total: 0,
    pagination: {
      total: 0,
    },
  };
};

export const getDetailTransactionDailySalesReport = async (
  type: string,
  params: any,
  id: number
): Promise<IResponseDetailDailySalesReport> => {
  try {
    const res = await fetch({
      path: `admin/daily-sales-report/detail/${type}/list/${id}`,
      method: "get",
      params,
    });
    const dataArr =
      res?.data?.orders?.map((val: any, index: number) => ({
        ...val,
        no: index + 1 + ((params?.page - 1) * params?.limit || 0),
      })) || [];
    const response = {
      data: dataArr,
      total: res?.data?.total,
      pagination: res?.meta?.pagination,
    };
    return response;
  } catch {}
  return {
    data: [],
    total: 0,
    pagination: {
      total: 0,
    },
  };
};

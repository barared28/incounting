import { useMemo } from "react";
import ExportButton from "@/components/button/export";
import TableStyled from "@/components/table-styled";
import { ColumnTable } from "@/types";
import { ActionIcon, Divider, Flex, Select, Tooltip } from "@mantine/core";
import {
  IconArrowsExchange2,
  IconCalendarPause,
  IconMail,
} from "@tabler/icons-react";
import { StatusOptions } from "../constant";
import { IPaymentScheduleDetailsResponse } from "@/services/payment-schedule";
import moment from "moment";
import { formatIDR } from "@/utils/currency";
import ColumnStatus from "./column-status";

interface IProps {
  data: IPaymentScheduleDetailsResponse;
  setStatus: (status: string) => void;
  loading?: boolean;
  setSelectedId: (id: number) => void;
  handleUpload: () => void;
  handlePostpone: () => void;
  handleReminder: () => void;
}

const TablePaymentScheduleDetails = (props: IProps) => {
  const {
    setStatus,
    data,
    loading,
    handleUpload,
    setSelectedId,
    handlePostpone,
    handleReminder,
  } = props;
  const columns = useMemo<ColumnTable<any>[]>(
    () => [
      {
        accessor: "name",
        Header: "NAME",
      },
      {
        accessor: "date",
        Header: "DATE",
        Cell: ({ value }) => moment(value).format("DD MMM YYYY"),
      },
      {
        accessor: "percentage",
        Header: "%",
        Cell: ({ value }) => `${value}%`,
      },
      {
        accessor: "amount",
        Header: "AMOUNT",
        Cell: () => formatIDR(data?.data?.amount || 0),
      },
      {
        accessor: "full_payment",
        Header: "FULL PAYMENT",
        Cell: ({ value }) => formatIDR(value),
      },
      {
        accessor: "outstanding",
        Header: "OUTSTANDING",
        Cell: ({ value }) => formatIDR(value),
      },
      {
        accessor: "status",
        Header: "STATUS",
        Cell: ({ value }: any) => <ColumnStatus data={value} />,
        maxWidth: 90,
      },
      {
        accessor: "action",
        Header: "ACTION",
        Cell: ({ row }) => (
          <Flex gap="sm">
            <Tooltip label="Send">
              <ActionIcon
                color="blue"
                onClick={() => {
                  setSelectedId(row?.original?.id);
                  handleReminder();
                }}
                disabled={!row?.original?.actionable}
                variant={row?.original?.actionable ? "subtle" : "transparent"}
              >
                <IconMail />
              </ActionIcon>
            </Tooltip>
            <Divider orientation="vertical" />
            <Tooltip label="Postpone">
              <ActionIcon
                color="blue"
                onClick={() => {
                  handlePostpone();
                }}
                disabled={!row?.original?.actionable}
                variant={row?.original?.actionable ? "subtle" : "transparent"}
              >
                <IconCalendarPause />
              </ActionIcon>
            </Tooltip>
            <Divider orientation="vertical" />
            <Tooltip label="Approve">
              <ActionIcon
                color="blue"
                onClick={() => {
                  setSelectedId(row?.original?.id);
                  handleUpload();
                }}
                disabled={!row?.original?.actionable}
                variant={row?.original?.actionable ? "subtle" : "transparent"}
              >
                <IconArrowsExchange2 />
              </ActionIcon>
            </Tooltip>
          </Flex>
        ),
        maxWidth: 120,
      },
    ],
    [data?.data?.amount]
  );
  return (
    <TableStyled
      columns={columns}
      data={data?.data?.payments || []}
      descLabelSearch="Name"
      leftContent={
        <>
          <Select
            data={StatusOptions}
            description="Status"
            placeholder="Filter Status"
            allowDeselect
            clearable
            onChange={(value) => setStatus(value || "")}
          />
        </>
      }
      rightContent={<ExportButton />}
      loading={loading}
      flipContentRight
      disableCreate
      disableSearch
      disablePagination
    />
  );
};

export default TablePaymentScheduleDetails;

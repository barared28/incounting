import { useMemo } from "react";
import TableStyled from "@/components/table-styled";
import { ActionIcon, Box, Divider, Flex, Text, Tooltip } from "@mantine/core";
import { ColumnTable } from "@/types";
import {
  IconBuildingSkyscraper,
  IconCalendar,
  IconCalendarStats,
  IconEye,
  IconTrash,
} from "@tabler/icons-react";
import {
  IPaymentScheduleResponse,
  IResponseDataPaymentSchedule,
} from "@/services/payment-schedule";
import { DatePickerInput } from "@mantine/dates";
import ExportButton from "@/components/button/export";
import { formatIDR } from "@/utils/currency";
import moment from "moment";
import DeleteConfirm from "@/components/modal/delete-confirm";
import useDeletePaymentSchedule from "../hooks/use-delete";

interface IProps {
  onChangePagination: (page: number, limit: number) => void;
  page: number;
  limit: number;
  data: IPaymentScheduleResponse | undefined;
  loading: boolean;
  handleCreate: () => void;
  handleView: (id: number) => void;
  handleSearch?: (value: string) => void;
  handleChangeRangeDate: (start: any, end: any) => void;
}

const TablePaymentSchedule = (props: IProps) => {
  const {
    data,
    page,
    limit,
    loading,
    handleCreate,
    onChangePagination,
    handleView,
    handleSearch,
    handleChangeRangeDate,
  } = props;
  const {
    close,
    handleDelete,
    handleOpen,
    loading: loadingDelete,
    opened,
  } = useDeletePaymentSchedule();
  const columns = useMemo<ColumnTable<IResponseDataPaymentSchedule>[]>(
    () => [
      {
        accessor: "name",
        Header: "NAME",
      },
      {
        accessor: "property",
        Header: "PROPERTY",
        Cell: ({ value, row }: any) => (
          <Flex align="center" gap="sm">
            <IconBuildingSkyscraper />
            <Box>
              <Text>{value}</Text>
              <Text size="xs" color="gray">
                {row?.original?.property_type || "-"}
              </Text>
            </Box>
          </Flex>
        ),
      },
      {
        Header: "INSTALLMENT",
        accessor: "installment",
        Cell: ({ row }: any) => (
          <Flex align="center" gap="sm">
            <IconCalendarStats />
            <Box>
              <Text size="md">{`${
                (row?.original?.instalment || 0) +
                (row?.original?.dp_instalment || 0)
              } Month`}</Text>
              <Text size="xs" color="gray">
                {`Downpayment: ${row?.original?.dp_instalment || 0} Month`}
              </Text>
              <Text size="xs" color="gray">
                {`Installment: ${row?.original?.instalment || 0} Month`}
              </Text>
            </Box>
          </Flex>
        ),
      },
      {
        Header: "AMOUNT",
        accessor: "amount",
        Cell: ({ value }: any) => formatIDR(value),
      },
      {
        Header: "OUTSTANDING",
        accessor: "outstanding",
        Cell: ({ value }: any) => formatIDR(value),
      },
      {
        Header: "LAST PAYMENT",
        accessor: "last_payment",
        Cell: ({ value }: any) =>
          value ? moment(value).format("DD MMM YYYY") : "-",
      },
      {
        Header: "ACTION",
        accessor: "action",
        Cell: ({ row }: any) => (
          <Flex gap="sm" justify="center">
            <Tooltip label="View">
              <ActionIcon
                color="blue"
                onClick={() => handleView(row?.original?.id)}
              >
                <IconEye />
              </ActionIcon>
            </Tooltip>
            <Divider orientation="vertical" />
            <Tooltip label="Delete">
              <ActionIcon
                color="red"
                onClick={() => handleOpen(row?.original?.id)}
              >
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          </Flex>
        ),
        maxWidth: 100,
      },
    ],
    []
  );
  return (
    <>
      <TableStyled
        columns={columns}
        data={data?.data || []}
        page={page}
        limit={limit}
        total={data?.pagination?.total || 0}
        loading={loading}
        onChangePagination={onChangePagination}
        handleCreate={handleCreate}
        handleSearch={handleSearch}
        descLabelSearch="Name"
        leftContent={
          <DatePickerInput
            description="Last Payment"
            miw={250}
            type="range"
            placeholder="Filter Date"
            onChange={([start, end]) => handleChangeRangeDate(start, end)}
            icon={<IconCalendar size={18} />}
            clearable
          />
        }
        rightContent={<ExportButton />}
        flipContentRight
      />
      <DeleteConfirm
        opened={opened}
        onClose={close}
        onConfirm={handleDelete}
        loading={loadingDelete}
      />
    </>
  );
};

export default TablePaymentSchedule;

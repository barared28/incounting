import { useMemo } from "react";
import { ColumnTable } from "@/types";
import {
  IAttendanceResponse,
  IResponseDataAttendance,
} from "@/services/attendance";
import TableStyled from "@/components/table-styled";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconEye } from "@tabler/icons-react";
import ExportButton from "@/components/button/export";
import SelectCustomers from "@/components/select/customers";
import { ActionIcon, Badge, Tooltip } from "@mantine/core";
import moment from "moment";

interface IProps {
  onChangePagination: (page: number, limit: number) => void;
  page: number;
  limit: number;
  data: IAttendanceResponse | undefined;
  loading: boolean;
  handleView: (id: number) => void;
  handleChangeRangeDate: (start: any, end: any) => void;
  setContactId: any;
}

const TableAttendance = (props: IProps) => {
  const {
    data,
    page,
    limit,
    loading,
    onChangePagination,
    handleView,
    handleChangeRangeDate,
    setContactId,
  } = props;
  const columns = useMemo<ColumnTable<IResponseDataAttendance>[]>(
    () => [
      {
        accessor: "no",
        Header: "#",
        maxWidth: 50,
      },
      {
        accessor: "contact.nickname",
        Header: "Employee Name",
      },
      {
        accessor: "total_attendance",
        Header: "Total Present",
      },
      {
        accessor: "total_absent",
        Header: "Total Absent",
      },
      {
        accessor: "target_present",
        Header: "Target Present",
      },
      {
        accessor: "present_percentage",
        Header: "Present Percentage",
        Cell: ({ value }: any) =>
          value || value === 0 ? <Badge>{value}%</Badge> : "-",
      },
      {
        accessor: "detail",
        Header: "Detail",
        maxWidth: 60,
        Cell: ({ row }: any) => (
          <Tooltip label="View Detail">
            <ActionIcon
              color="blue"
              variant="transparent"
              onClick={() => handleView(row?.original?.contact)}
            >
              <IconEye size={18} />
            </ActionIcon>
          </Tooltip>
        ),
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
        onChangePagination={onChangePagination}
        loading={loading}
        disableCreate
        disableSearch
        leftContent={
          <>
            <DatePickerInput
              type="range"
              w={300}
              icon={<IconCalendar size={18} />}
              onChange={(val) => {
                if (val[0] && val[1]) {
                  handleChangeRangeDate(val[0], val[1]);
                }
              }}
              defaultValue={[
                moment().startOf("month").toDate(),
                moment().toDate(),
              ]}
            />
            <SelectCustomers
              filterType={3}
              label=""
              w={300}
              clearable
              placeholder=""
              onChange={(val) => {
                setContactId(val ? +val : 0);
              }}
            />
          </>
        }
        rightContent={<ExportButton />}
      />
    </>
  );
};

export default TableAttendance;

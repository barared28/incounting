import ExportButton from "@/components/button/export";
import PageDialog from "@/components/page-dialog";
import SelectCustomers from "@/components/select/customers";
import TableStyled from "@/components/table-styled";
import usePagination from "@/hooks/usePagination";
import { ColumnTable } from "@/types";
import { Badge, Box } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import moment from "moment";
import { useMemo, useState } from "react";
import useDataAttendanceDetail from "../hooks/use-data-detail";

interface IProps {
  opened: boolean;
  onClose: () => void;
  data: any;
  start?: any;
  end?: any;
}

enum EStatusAttendance {
  Passed = 1,
  Late = 2,
  Unpassed = 3,
}

const AttendanceDetail = (props: IProps) => {
  const { opened, onClose, data, start, end } = props;
  if (!opened || !data?.id) return null;
  const [filterContact, setFilterContact] = useState<string>(String(data?.id));
  const { page, limit, onChangePagination } = usePagination({});
  const {
    handleChangedDate,
    startDate,
    endDate,
    data: dataTable,
    isLoading,
    isRefetching,
  } = useDataAttendanceDetail({
    limit,
    page,
    id: +filterContact,
    start,
    end,
  });
  const columns = useMemo<ColumnTable<any>[]>(
    () => [
      {
        accessor: "no",
        Header: "#",
        maxWidth: 50,
      },
      {
        accessor: "attendance.clock_in_date",
        Header: "Clock In",
        Cell: ({ value }: any) =>
          value ? moment(value).format("DD MMM YYYY HH:mm") : "-",
      },
      {
        accessor: "attendance.clock_out_date",
        Header: "Clock Out",
        Cell: ({ value }: any) =>
          value ? moment(value).format("DD MMM YYYY HH:mm") : "-",
      },
      {
        accessor: "duration",
        Header: "Duration",
        Cell: ({ value }: any) => value || "-",
      },
      {
        accessor: "late_minutes",
        Header: "Late Minutes",
        Cell: ({ value }: any) => value || "-",
      },
      {
        accessor: "status",
        Header: "Status",
        maxWidth: 100,
        Cell: ({ value }: any) => {
          let result: any = "-";
          switch (+value) {
            case EStatusAttendance.Passed:
              result = <Badge color="green">Passed</Badge>;
              break;
            case EStatusAttendance.Late:
              result = <Badge color="red">Late</Badge>;
              break;
            case EStatusAttendance.Unpassed:
              result = <Badge color="yellow">Unpassed</Badge>;
              break;
          }
          return result;
        },
      },
    ],
    []
  );
  return (
    <PageDialog show={opened} onCancel={onClose} type="view">
      <Box w="100%" mih="65vh">
        <TableStyled
          columns={columns}
          data={dataTable?.data || []}
          loading={isLoading || isRefetching}
          page={page}
          limit={limit}
          total={dataTable?.pagination?.total || 0}
          disableSearch
          disableCreate
          leftContent={
            <>
              <DatePickerInput
                type="range"
                w={300}
                icon={<IconCalendar size={18} />}
                onChange={(val) => {
                  if (val[0] && val[1]) {
                    handleChangedDate(val[0], val[1]);
                  }
                }}
                defaultValue={[
                  moment(startDate).toDate(),
                  moment(endDate).toDate(),
                ]}
              />
              <SelectCustomers
                filterType={3}
                label=""
                w={300}
                placeholder=""
                selectedData={data}
                value={filterContact}
                onChange={(val) => setFilterContact(val || "")}
              />
            </>
          }
          rightContent={<ExportButton />}
          onChangePagination={onChangePagination}
        />
      </Box>
    </PageDialog>
  );
};

export default AttendanceDetail;

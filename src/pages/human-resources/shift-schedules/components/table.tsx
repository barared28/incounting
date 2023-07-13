import DeleteConfirm from "@/components/modal/delete-confirm";
import TableStyled from "@/components/table-styled";
import { ColumnTable } from "@/types";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useMemo } from "react";
import useDeleteShiftSchedule from "../hooks/use-delete";

interface IProps {
  onChangePagination: (page: number, limit: number) => void;
  page: number;
  limit: number;
  data: any;
  loading: boolean;
  handleCreate: () => void;
  handleEdit: (data: any) => void;
  handleSearch: (value: string) => void;
}

const convertTime = (time: string) => {
  const timeArr = time.split(":");
  timeArr.pop();
  return timeArr.join(":");
};

const TableShiftSchedules = (props: IProps) => {
  const { handleCreate, data, page, limit, loading, handleSearch, handleEdit } =
    props;
  const {
    handleOpen,
    loading: loadingDelete,
    opened,
    close,
    handleDelete,
  } = useDeleteShiftSchedule();

  const columns = useMemo<ColumnTable<any>[]>(
    () => [
      {
        accessor: "name",
        Header: "Name",
      },
      {
        accessor: "start_time",
        Header: "Start Time",
        Cell: ({ value }) => (value ? convertTime(value) : "-"),
      },
      {
        accessor: "end_time",
        Header: "End Time",
        Cell: ({ value }) => (value ? convertTime(value) : "-"),
      },
      {
        accessor: "break_time",
        Header: "Break Time",
        Cell: ({ row }) =>
          row?.original?.start_break && row?.original?.end_break
            ? `${convertTime(row?.original?.start_break)} - ${convertTime(
                row?.original?.end_break
              )}`
            : "-",
      },
      {
        accessor: "description",
        Header: "Description",
      },
      {
        accessor: "action",
        Header: "Action",
        maxWidth: 100,
        Cell: ({ row }) => (
          <Flex gap="sm">
            <Tooltip label="Edit">
              <ActionIcon
                color="blue"
                onClick={() => handleEdit(row?.original)}
              >
                <IconEdit />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Edit">
              <ActionIcon
                color="red"
                onClick={() => handleOpen(row?.original?.id)}
              >
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          </Flex>
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
        loading={loading}
        limit={limit}
        page={page}
        handleCreate={handleCreate}
        total={data?.pagination?.total || 0}
        handleSearch={handleSearch}
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

export default TableShiftSchedules;

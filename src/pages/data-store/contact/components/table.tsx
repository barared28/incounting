import DeleteConfirm from "@/components/modal/delete-confirm";
import TableStyled from "@/components/table-styled";
import { ColumnTable } from "@/types";
import { ActionIcon, Divider, Flex, Select, Tooltip } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { useMemo } from "react";
import { CellProps } from "react-table";
import useDeleteContact from "../hooks/use-delete";

interface IProps {
  onChangePagination: (page: number, limit: number) => void;
  page: number;
  limit: number;
  data: any;
  loading: boolean;
  handleCreate: () => void;
  filterType: string;
  setFilterType: (value: string) => void;
  setFilterSearch: (value: string) => void;
  handleDetails: (data: any) => void;
  handleEdit: (data: any) => void;
}

const OptionType = [
  {
    label: "Supplier",
    value: "1",
  },
  {
    label: "Customer",
    value: "2",
  },
  {
    label: "Employee",
    value: "3",
  },
  {
    label: "Other",
    value: "4",
  },
  {
    label: "All Type",
    value: "5",
  },
];

const TableContact = (props: IProps) => {
  const {
    page,
    limit,
    onChangePagination,
    data,
    loading,
    handleCreate,
    filterType,
    setFilterType,
    setFilterSearch,
    handleDetails,
    handleEdit,
  } = props;
  const {
    handleOpen,
    loading: loadingDelete,
    opened,
    close,
    handleDelete,
  } = useDeleteContact();
  const columns = useMemo<ColumnTable<any>[]>(
    () => [
      {
        accessor: "no",
        Header: "#",
        maxWidth: 10,
      },
      {
        accessor: "division",
        Header: "Division",
        Cell: ({ value }: CellProps<any>) => value?.name || "-",
      },
      {
        accessor: "name",
        Header: "Name",
      },
      {
        accessor: "company_name",
        Header: "Company Name",
      },
      {
        accessor: "email",
        Header: "Email",
      },
      {
        accessor: "handphone",
        Header: "Phone Number",
      },
      {
        accessor: "action",
        Header: "Action",
        maxWidth: 80,
        Cell: ({ row }: CellProps<any>) => (
          <Flex gap="xs" justify="end" maw={80}>
            <Tooltip label="View Details">
              <ActionIcon
                color="blue"
                onClick={() => handleDetails(row?.original)}
              >
                <IconEye />
              </ActionIcon>
            </Tooltip>
            <Divider orientation="vertical" />
            <Tooltip label="Edit">
              <ActionIcon
                color="blue"
                onClick={() => handleEdit(row?.original)}
              >
                <IconEdit />
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
        handleCreate={handleCreate}
        handleSearch={setFilterSearch}
        leftContent={
          <Select
            placeholder="All Type"
            data={OptionType}
            value={filterType}
            onChange={(value) => setFilterType(value || "")}
          />
        }
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

export default TableContact;

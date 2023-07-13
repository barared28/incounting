import { ColumnTable } from "@/types";
import { ActionIcon, Flex } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useMemo } from "react";
import { CellProps } from "react-table";

const useColumns = (props: any) => {
  const { handleEdit, handleDelete } = props;
  const columns = useMemo<ColumnTable<any>[]>(
    () => [
      {
        accessor: "no",
        Header: "#",
        maxWidth: 10,
      },
      {
        accessor: "company_name",
        Header: "Company Name",
      },
      {
        accessor: "type",
        Header: "Type",
        Cell: (val: CellProps<any>) => {
          if (+val.row.original?.type === 1) {
            return "Online Travel Agent";
          } else if (+val.row.original?.type === 2) {
            return "Offline Travel Agent";
          } else if (+val.row.original?.type === 3) {
            return "Corporate";
          }
        },
      },
      {
        accessor: "email",
        Header: "Email",
      },
      {
        accessor: "handphone",
        Header: "Handphone",
      },
      {
        accessor: "pic_name",
        Header: "PIC Name",
      },
      {
        accessor: "action",
        Header: "Action",
        maxWidth: 90,
        Cell: (val: CellProps<any>) => (
          <Flex gap="sm">
            <ActionIcon
              color="blue"
              onClick={() => handleEdit(val.row.original)}
            >
              <IconEdit />
            </ActionIcon>
            <ActionIcon
              color="red"
              onClick={() => handleDelete(val?.row?.original?.id)}
            >
              <IconTrash />
            </ActionIcon>
          </Flex>
        ),
      },
    ],
    []
  );
  return columns;
};

export default useColumns;

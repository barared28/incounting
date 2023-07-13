import { ColumnTable } from "@/types";
import { ActionIcon, Flex, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useMemo } from "react";
import { CellProps } from "react-table";

interface IProps {
  handleEdit: (val: any) => void;
  handleDelete: (val: any) => void;
}

const useColumns = (props: IProps) => {
  const { handleEdit, handleDelete } = props;
  const columns = useMemo<ColumnTable<any>[]>(
    () => [
      {
        accessor: "no",
        Header: "#",
        maxWidth: 10,
      },
      {
        accessor: "display_name",
        Header: "Name",
      },
      {
        accessor: "accesses",
        Header: "Permission",
        Cell: (val: CellProps<any>) => (
          <Text>{`${
            val?.row?.original?.accesses?.length || 0
          } Permission`}</Text>
        ),
      },
      {
        accessor: "action",
        Header: "Action",
        maxWidth: 80,
        Cell: (val: CellProps<any>) => (
          <Flex gap="md">
            <ActionIcon
              variant="transparent"
              color="blue"
              onClick={() => handleEdit(val.row.original)}
            >
              <IconEdit />
            </ActionIcon>
            <ActionIcon
              variant="transparent"
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

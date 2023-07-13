import { ColumnTable } from "@/types";
import { ActionIcon, Flex } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import moment from "moment";
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
        Header: "No",
        maxWidth: 10,
      },
      {
        accessor: "name",
        Header: "Name",
      },
      {
        accessor: "created_at",
        Header: "Created At",
        Cell: ({ value }: CellProps<any>) =>
          moment(value).format("DD MMM YYYY"),
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
              onClick={() => handleDelete(val.row.original?.id)}
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

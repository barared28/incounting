import { useMemo } from "react";
import { IResponseDataPropertyType } from "@/services/property-type";
import { ColumnTable } from "@/types";
import { formatIDR } from "@/utils/currency";
import { ActionIcon, Divider, Flex, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

interface IProps {
  handleEdit: (val: any) => void;
  handleDelete: (val: any) => void;
}

const useColumns = (props: IProps) => {
  const { handleEdit, handleDelete } = props;
  const columns = useMemo<ColumnTable<IResponseDataPropertyType>[]>(
    () => [
      {
        accessor: "name",
        Header: "Name",
      },
      {
        accessor: "price",
        Header: "Price",
        Cell: ({ value }: any) => formatIDR(value),
      },
      {
        accessor: "action",
        Header: "Action",
        maxWidth: 10,
        Cell: (val: any) => (
          <Flex gap="sm">
            <Tooltip label="Edit">
              <ActionIcon
                onClick={() => handleEdit(val?.row?.original)}
                data-cy={`edit-property-type-${val?.row?.original.name}`}
                color="blue"
              >
                <IconEdit />
              </ActionIcon>
            </Tooltip>
            <Divider orientation="vertical" />
            <Tooltip label="Delete">
              <ActionIcon
                onClick={() => handleDelete(val?.row?.original?.id)}
                data-cy={`delete-property-type-${val?.row?.original.name}`}
                color="red"
              >
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          </Flex>
        ),
        width: 10,
      },
    ],
    []
  );
  return columns;
};

export default useColumns;

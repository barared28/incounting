import DeleteConfirm from "@/components/modal/delete-confirm";
import TableStyled from "@/components/table-styled";
import { IResponseDataProperty } from "@/services/property";
import { ColumnTable } from "@/types";
import { formatIDR } from "@/utils/currency";
import {
  ActionIcon,
  Box,
  Flex,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { IconBuilding, IconEdit, IconTrash } from "@tabler/icons-react";
import useDeleteProperty from "../hooks/use-delete";

interface IProps {
  onChangePagination: (page: number, limit: number) => void;
  page: number;
  limit: number;
  data: any;
  onEdit: any;
  loading: boolean;
  handleCreate: () => void;
}

const TableProperty = (props: IProps) => {
  const {
    page,
    limit,
    data,
    onChangePagination,
    onEdit,
    loading,
    handleCreate,
  } = props;
  const theme = useMantineTheme();
  const handleEdit = (val: any) => {
    onEdit({
      id: val?.id || "",
      code: val?.code || "",
      name: val?.name || "",
      type: val?.type || null,
      product_category_id: val?.type?.id ? String(val.type.id) : "",
    });
  };
  const {
    close,
    handleOpen,
    opened,
    handleDelete,
    loading: loadingDelete,
  } = useDeleteProperty();
  const columns: ColumnTable<IResponseDataProperty>[] = [
    {
      accessor: "name",
      Header: "Name",
    },
    {
      accessor: "code",
      Header: "Code",
    },
    {
      accessor: "type",
      Header: "Type",
      Cell: ({ value }: any) => (
        <Flex gap="xs" align="center">
          <IconBuilding />
          <Box>
            <Text size="sm" weight={500}>
              {value?.name}
            </Text>
            <Text size="xs" italic>
              {formatIDR(value?.price || 0)}
            </Text>
          </Box>
        </Flex>
      ),
    },
    {
      accessor: "action",
      Header: "Action",
      maxWidth: 10,
      Cell: (val: any) => (
        <Flex gap="sm">
          <Tooltip label="Edit">
            <ActionIcon
              data-cy={`update-property-${val?.row?.original?.name}`}
              onClick={() => handleEdit(val?.row?.original)}
            >
              <IconEdit color={theme.colors.blue[6]} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete">
            <ActionIcon
              onClick={() => handleOpen(val?.row?.original?.id)}
              data-cy={`delete-property-${val?.row?.original.name}`}
              color="red"
            >
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        </Flex>
      ),
    },
  ];

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

export default TableProperty;

import TableStyled from "@/components/table-styled";
import useColumns from "./columns";
import DeleteConfirm from "@/components/modal/delete-confirm";
import useDeleteRole from "../../hooks/use-delete";

interface IProps {
  onChangePagination: (page: number, limit: number) => void;
  page: number;
  limit: number;
  data: any;
  onEdit: any;
  loading: boolean;
  handleCreate: () => void;
  handleSearch?: (value: string) => void;
}

const TableRole = (props: IProps) => {
  const {
    page,
    limit,
    onChangePagination,
    data,
    onEdit,
    loading,
    handleCreate,
    handleSearch,
  } = props;
  const {
    close,
    handleOpen,
    opened,
    handleDelete,
    loading: loadingDelete,
  } = useDeleteRole();
  const columns = useColumns({ handleEdit: onEdit, handleDelete: handleOpen });
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

export default TableRole;

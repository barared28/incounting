import TableStyled from "@/components/table-styled";
import useColumns from "./columns";
import useDeleteBookingSource from "../../hooks/use-delete";
import DeleteConfirm from "@/components/modal/delete-confirm";

interface IProps {
  onChangePagination: (page: number, limit: number) => void;
  page: number;
  limit: number;
  data: any;
  onEdit: (val: any) => void;
  loading: boolean;
  handleCreate: () => void;
  handleSearch: (val: string) => void;
}

const TableBookingSource = (props: IProps) => {
  const {
    data,
    handleCreate,
    limit,
    loading,
    onChangePagination,
    onEdit,
    page,
    handleSearch,
  } = props;
  const {
    close,
    handleOpen,
    opened,
    handleDelete,
    loading: loadingDelete,
  } = useDeleteBookingSource();
  const columns = useColumns({ handleEdit: onEdit, handleDelete: handleOpen });
  return (
    <>
      <TableStyled
        columns={columns}
        data={data?.data || []}
        limit={limit}
        page={page}
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

export default TableBookingSource;

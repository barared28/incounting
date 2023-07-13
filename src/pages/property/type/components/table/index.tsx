import TableStyled from "@/components/table-styled";
import DeleteConfirm from "@/components/modal/delete-confirm";
import { IPropertyTypeResponse } from "@/services/property-type";
import useDeletePropertyType from "../../hooks/use-delete";
import useColumns from "./columns";

interface IProps {
  onChangePagination: (page: number, limit: number) => void;
  page: number;
  limit: number;
  data: IPropertyTypeResponse | undefined;
  onEdit: any;
  loading: boolean;
  handleCreate: () => void;
}

const TablePropertyType = (props: IProps) => {
  const {
    page,
    limit,
    onChangePagination,
    data,
    onEdit,
    loading,
    handleCreate,
  } = props;
  const {
    close,
    handleOpen,
    opened,
    handleDelete,
    loading: loadingDelete,
  } = useDeletePropertyType();
  const handleEdit = (val: any) => {
    onEdit({
      name: val?.name || "",
      price: val?.price || 0,
      id: val?.id || "",
    });
  };
  const columns = useColumns({ handleEdit, handleDelete: handleOpen });
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

export default TablePropertyType;

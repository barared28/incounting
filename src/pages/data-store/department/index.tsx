import { Box, Title } from "@mantine/core";
import useFormPage from "@/hooks/useFormPage";
import usePagination from "@/hooks/usePagination";
import TableDepartment from "./components/table";
import useDataDepartment from "./hooks/use-data";
import FormDepartment from "./components/form";

const Department = () => {
  const { limit, onChangePagination, page } = usePagination({});
  const {
    showForm,
    selectedData,
    handleClose,
    formType,
    setShowForm,
    handleEdit,
  } = useFormPage();
  const { data, isLoading, setSearch, isRefetching } = useDataDepartment({
    limit,
    page,
  });
  return (
    <Box>
      <Title size={24} weight={500} mb={32}>
        Department
      </Title>
      <TableDepartment
        data={data}
        limit={limit}
        loading={isLoading || isRefetching}
        onChangePagination={onChangePagination}
        onEdit={handleEdit}
        page={page}
        handleCreate={() => setShowForm(true)}
        handleSearch={setSearch}
      />
      <FormDepartment
        opened={showForm}
        data={selectedData}
        onClose={handleClose}
        type={formType}
      />
    </Box>
  );
};

export default Department;

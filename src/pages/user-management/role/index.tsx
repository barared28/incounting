import { Box, Title } from "@mantine/core";
import TableRole from "./components/table";
import FormRole from "./components/form";
import useFormPage from "@/hooks/useFormPage";
import usePagination from "@/hooks/usePagination";
import useDataRole from "./hooks/use-data";

const Role = () => {
  const { limit, page, onChangePagination } = usePagination({});
  const { data, isLoading, isRefetching, setName } = useDataRole({
    page,
    limit,
  });
  const {
    setShowForm,
    handleEdit,
    showForm,
    handleClose,
    selectedData,
    formType,
  } = useFormPage();
  return (
    <Box>
      <Title size={24} weight={500} mb={32}>
        Role
      </Title>
      <TableRole
        limit={limit}
        page={page}
        onChangePagination={onChangePagination}
        onEdit={handleEdit}
        handleCreate={() => setShowForm(true)}
        loading={isLoading || isRefetching}
        data={data}
        handleSearch={setName}
      />
      <FormRole
        opened={showForm}
        onClose={handleClose}
        data={selectedData}
        type={formType}
      />
    </Box>
  );
};

export default Role;

import { Box, Title } from "@mantine/core";
import TableProperty from "./components/table";
import usePagination from "@/hooks/usePagination";
import { useDataProperty } from "./hooks";
import FormProperty from "./components/form";
import useFormPage from "@/hooks/useFormPage";

const Property = () => {
  const { limit, page, onChangePagination } = usePagination({});
  const { data, isLoading, isRefetching } = useDataProperty({ limit, page });
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
        Property
      </Title>
      <TableProperty
        data={data}
        limit={limit}
        page={page}
        onChangePagination={onChangePagination}
        onEdit={handleEdit}
        loading={isLoading || isRefetching}
        handleCreate={() => setShowForm(true)}
      />
      <FormProperty
        opened={showForm}
        onClose={handleClose}
        data={selectedData}
        type={formType}
      />
    </Box>
  );
};

export default Property;

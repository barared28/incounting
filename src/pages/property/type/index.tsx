import { Box, Title } from "@mantine/core";
import useFormPage from "@/hooks/useFormPage";
import usePagination from "@/hooks/usePagination";
import FormPropertyType from "./components/form";
import TablePropertyType from "./components/table";
import useDataPropertyType from "./hooks/use-data";

const PropertyType = () => {
  const { limit, page, onChangePagination } = usePagination({});
  const { data, isLoading, isRefetching } = useDataPropertyType({
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
        Property Type
      </Title>
      <TablePropertyType
        limit={limit}
        page={page}
        onChangePagination={onChangePagination}
        data={data}
        onEdit={handleEdit}
        loading={isLoading || isRefetching}
        handleCreate={() => setShowForm(true)}
      />
      <FormPropertyType
        opened={showForm}
        onClose={handleClose}
        data={selectedData}
        type={formType}
      />
    </Box>
  );
};

export default PropertyType;

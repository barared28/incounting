import useFormPage from "@/hooks/useFormPage";
import usePagination from "@/hooks/usePagination";
import { Box, Title } from "@mantine/core";
import useDataBookingSource from "./hooks/use-data";
import TableBookingSource from "./components/table";
import FormBookingSource from "./components/form";

const BookingSource = () => {
  const { limit, page, onChangePagination } = usePagination({});
  const {
    showForm,
    selectedData,
    handleClose,
    formType,
    setShowForm,
    handleEdit,
  } = useFormPage();
  const { data, isLoading, isFetching, setSearch } = useDataBookingSource({
    limit,
    page,
  });
  return (
    <Box>
      <Title size={24} weight={500} mb={32}>
        Booking Source
      </Title>
      <TableBookingSource
        limit={limit}
        page={page}
        onChangePagination={onChangePagination}
        handleCreate={() => setShowForm(true)}
        handleSearch={setSearch}
        loading={isLoading || isFetching}
        data={data}
        onEdit={handleEdit}
      />
      <FormBookingSource
        opened={showForm}
        onClose={handleClose}
        data={selectedData}
        type={formType}
      />
    </Box>
  );
};

export default BookingSource;

import { Box, Title } from "@mantine/core";
import TableShiftSchedules from "./components/table";
import usePagination from "@/hooks/usePagination";
import useFormPage from "@/hooks/useFormPage";
import FormShiftSchedule from "./components/form";
import useDataShiftSchedule from "./hooks/use-data";

const ShiftSchedules = () => {
  const { limit, page, onChangePagination } = usePagination({});
  const {
    showForm,
    selectedData,
    formType,
    handleClose,
    setShowForm,
    setFormType,
    setSelectedData,
  } = useFormPage();
  const { data, setSearch, isLoading, isRefetching } = useDataShiftSchedule({
    limit,
    page,
  });
  return (
    <Box>
      <Title size={24} weight={500} mb={32}>
        Shift Schedules
      </Title>
      <TableShiftSchedules
        data={data}
        handleCreate={() => setShowForm(true)}
        limit={limit}
        loading={isLoading || isRefetching}
        onChangePagination={onChangePagination}
        page={page}
        handleEdit={(val) => {
          setSelectedData(val);
          setFormType("update");
          setShowForm(true);
        }}
        handleSearch={(val: string) => setSearch(val)}
      />
      <FormShiftSchedule
        data={selectedData}
        onClose={handleClose}
        opened={showForm}
        type={formType}
      />
    </Box>
  );
};

export default ShiftSchedules;

import { Box, Title } from "@mantine/core";
import usePagination from "@/hooks/usePagination";
import useFormPage from "@/hooks/useFormPage";
import TableContact from "./components/table";
import FormContact from "./components/form";
import { useDataContact, useFilterContact } from "./hooks";

const Contact = () => {
  const { limit, page, onChangePagination, setPage } = usePagination({});
  const {
    showForm,
    selectedData,
    formType,
    handleClose,
    setShowForm,
    setFormType,
    setSelectedData,
  } = useFormPage();
  const { filterSearch, filterType, setFilterSearch, setFilterType } =
    useFilterContact();
  const { data, isLoading, isRefetching } = useDataContact({
    limit,
    page,
    search: filterSearch,
    type: filterType,
  });

  const handleDetails = (data: any) => {
    setFormType("view");
    setShowForm(true);
    setSelectedData(data);
  };
  const handleEdit = (data: any) => {
    setFormType("update");
    setShowForm(true);
    setSelectedData(data);
  };
  return (
    <Box>
      <Title size={24} weight={500} mb={32}>
        Contact
      </Title>
      <TableContact
        data={data}
        handleCreate={() => setShowForm(true)}
        limit={limit}
        loading={isLoading || isRefetching}
        onChangePagination={onChangePagination}
        handleEdit={handleEdit}
        page={page}
        filterType={filterType}
        setFilterType={setFilterType}
        setFilterSearch={(val: string) => {
          setFilterSearch(val);
          setPage(1);
        }}
        handleDetails={handleDetails}
      />
      <FormContact
        data={selectedData}
        onClose={handleClose}
        opened={showForm}
        type={formType}
        onEdit={() => setFormType("update")}
      />
    </Box>
  );
};

export default Contact;

import { Title } from "@mantine/core";
import TableAttendance from "./components/table";
import usePagination from "@/hooks/usePagination";
import useFormPage from "@/hooks/useFormPage";
import AttendanceDetail from "./components/form";
import useDataAttendance from "./hooks/use-data";

const Attendance = () => {
  const { page, limit, onChangePagination } = usePagination({});
  const { showForm, selectedData, handleClose, setShowForm, setSelectedData } =
    useFormPage();
  const {
    data,
    isLoading,
    handleChangedDate,
    startDate,
    endDate,
    setContactId,
  } = useDataAttendance({
    limit,
    page,
  });
  return (
    <>
      <Title size={24} weight={500} mb={32}>
        Attendance
      </Title>
      <TableAttendance
        data={data}
        page={page}
        limit={limit}
        onChangePagination={onChangePagination}
        loading={isLoading}
        handleView={(val) => {
          setShowForm(true);
          setSelectedData(val);
        }}
        handleChangeRangeDate={handleChangedDate}
        setContactId={setContactId}
      />
      <AttendanceDetail
        opened={showForm}
        data={selectedData}
        onClose={handleClose}
        start={startDate}
        end={endDate}
      />
    </>
  );
};

export default Attendance;

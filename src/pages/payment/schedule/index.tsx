import { Title } from "@mantine/core";
import useFormPage from "@/hooks/useFormPage";
import TablePaymentSchedule from "./components/table";
import usePagination from "@/hooks/usePagination";
import {
  useDataPaymentSchedule,
  useDetailsPaymentSchedule,
  useFilterPaymentSchedule,
} from "./hooks";
import FormPaymentSchedule from "./components/form";
import DetailsPaymentSchedule from "./details";

const PaymentSchedule = () => {
  const { showForm, callForm, hideForm, formType } = useFormPage();
  const { page, limit, onChangePagination } = usePagination({});
  const { name, rangeDate, setName, handleChangeRangeDate } =
    useFilterPaymentSchedule();
  const { data, isLoading, isRefetching } = useDataPaymentSchedule({
    page,
    limit,
    name,
    rangeDate,
  });
  const { handleShow, visible, id, handleHide } = useDetailsPaymentSchedule();
  return (
    <>
      <Title size={24} weight={500} mb={32}>
        Payment Schedule
      </Title>
      <TablePaymentSchedule
        data={data}
        page={page}
        limit={limit}
        onChangePagination={onChangePagination}
        loading={isLoading || isRefetching}
        handleCreate={callForm}
        handleView={handleShow}
        handleSearch={setName}
        handleChangeRangeDate={handleChangeRangeDate}
      />
      <FormPaymentSchedule
        onClose={hideForm}
        opened={showForm}
        type={formType}
      />
      {visible && id ? (
        <DetailsPaymentSchedule
          handleHide={handleHide}
          id={id}
          visible={visible}
        />
      ) : null}
    </>
  );
};

export default PaymentSchedule;

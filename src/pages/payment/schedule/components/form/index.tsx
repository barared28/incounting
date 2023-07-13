import PageDialog from "@/components/page-dialog";
import { TPageDialogType } from "@/types";
import { Flex, rem } from "@mantine/core";
import CustomerFormSection from "./customer";
import PropertyFormSection from "./property";
import PaymentFormSection from "./payment";
import { useFormPaymentSchedule } from "./hooks";
import { useCreatePaymentSchedule } from "../../hooks";

interface IProps {
  opened: boolean;
  onClose: () => void;
  type: TPageDialogType;
}

const FormPaymentSchedule = (props: IProps) => {
  const { opened, onClose } = props;
  const { form, downPayment, setDownPayment, resetState } =
    useFormPaymentSchedule();
  const { handleCreate, loading } = useCreatePaymentSchedule();

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSubmit = (payload: any) => {
    handleCreate({ payload, callback: handleClose });
  };

  return (
    <PageDialog
      show={opened}
      onCancel={handleClose}
      title="Create Payment Schedule"
      onSubmit={form.onSubmit((val) => handleSubmit(val))}
      loading={loading}
    >
      <Flex direction="column" gap="sm" w="100%" maw={rem("900px")}>
        <CustomerFormSection form={form} />
        <PropertyFormSection form={form} />
        <PaymentFormSection
          form={form}
          downPayment={downPayment}
          setDownPayment={setDownPayment}
        />
      </Flex>
    </PageDialog>
  );
};

export default FormPaymentSchedule;

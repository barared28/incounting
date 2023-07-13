import MultipleSelectEmployee from "@/components/multiple-select/employee";
import SelectShifting from "@/components/select/shifting";
import { Button, Flex, Modal } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import useSaveWorkSchedule from "../../hooks/use-save";

interface IProps {
  opened: boolean;
  onClose: () => void;
  date: string;
}

const ModalAddSchedules = (props: IProps) => {
  const { opened, onClose, date } = props;

  const { t } = useTranslation();
  const schema = Yup.object({
    shifting_id: Yup.string().required(
      t("required", { key: "Shifting" }) || ""
    ),
    employee_ids: Yup.array()
      .required(t("required", { key: "Employee" }) || "")
      .min(1, t("required", { key: "Employee" }) || ""),
  });
  const form = useForm({
    initialValues: {
      shifting_id: "",
      employee_ids: [],
    },
    validate: yupResolver(schema),
  });
  const { handleSave, loading } = useSaveWorkSchedule();
  const handleClose = () => {
    form.reset();
    onClose();
  };
  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={`Add Schedules ${date || ""}`}
    >
      <Flex direction="column" gap="sm">
        <SelectShifting
          data={[]}
          label="Shift Schedule"
          withAsterisk
          withinPortal
          {...form.getInputProps("shifting_id")}
        />
        <MultipleSelectEmployee
          label="Employees"
          withAsterisk
          withinPortal
          {...form.getInputProps("employee_ids")}
        />
        <Button
          mt="sm"
          fullWidth
          onClick={() =>
            form.onSubmit((val) => {
              handleSave({
                payload: {
                  ...val,
                  start_effective_date: date,
                  repeat_on: false,
                },
                callback: handleClose,
              });
            })()
          }
          loading={loading}
        >
          Submit
        </Button>
      </Flex>
    </Modal>
  );
};

export default ModalAddSchedules;

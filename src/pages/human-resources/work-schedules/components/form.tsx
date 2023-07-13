import PageDialog from "@/components/page-dialog";
import { Checkbox, Flex, Paper, Select, Text, rem } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import useFormWorkSchedule from "../hooks/use-form";
import MultipleSelectEmployee from "@/components/multiple-select/employee";
import SelectShifting from "@/components/select/shifting";
import useSaveWorkSchedule from "../hooks/use-save";

interface IProps {
  opened: boolean;
  onClose: () => void;
}

export const DAYS = [
  { value: "Mon", label: "Monday" },
  { value: "Tue", label: "Tuesday" },
  { value: "Wed", label: "Wednesday" },
  { value: "Thu", label: "Thursday" },
  { value: "Fri", label: "Friday" },
  { value: "Sat", label: "Saturday" },
  { value: "Sun", label: "Sunday" },
];

const FormWorkSchedule = (props: IProps) => {
  const { opened, onClose } = props;
  const { form } = useFormWorkSchedule();
  const { handleSave, loading } = useSaveWorkSchedule();
  const handleClose = () => {
    form.reset();
    onClose();
  };
  return (
    <PageDialog
      show={opened}
      onCancel={handleClose}
      title="Create Work Schedule"
      onSubmit={form.onSubmit((val) => {
        handleSave({
          payload: val,
          callback: handleClose,
        });
      })}
      loading={loading}
    >
      <Flex direction="column" align="center" mih={600} w="100%">
        <Paper p="xl" w="100%" maw={rem("720px")} radius="sm">
          <MultipleSelectEmployee
            label="Employees"
            data={[]}
            withAsterisk
            {...form.getInputProps("employee_ids")}
          />
          <Flex gap="md" mt="sm">
            <SelectShifting
              w="100%"
              label="Shift Schedule"
              data={[]}
              withAsterisk
              {...form.getInputProps("shifting_id")}
            />
            <DatePickerInput
              w="100%"
              label="Effective Date"
              withAsterisk
              {...form.getInputProps("start_effective_date")}
            />
          </Flex>
          <Checkbox
            label="Repeat Shift"
            mt="sm"
            {...form.getInputProps("repeat_on")}
          />
          {form.values?.repeat_on ? (
            <>
              <Flex gap="md" mt="sm">
                <Select
                  w="100%"
                  label="Repeat every"
                  data={[
                    {
                      value: "1",
                      label: "1 Week",
                    },
                    {
                      value: "2",
                      label: "2 Weeks",
                    },
                  ]}
                  withAsterisk
                  {...form.getInputProps("repeat_on_week")}
                />
                <DatePickerInput
                  w="100%"
                  label="End Date"
                  withAsterisk
                  {...form.getInputProps("end_effective_date")}
                />
              </Flex>
              <Text mt="sm" size="sm" weight={500}>
                On Days
              </Text>
              <Checkbox.Group {...form.getInputProps("days")}>
                <Flex gap="sm" wrap="wrap" mt="xs">
                  {DAYS.map((day) => (
                    <Checkbox
                      key={day?.value}
                      value={day?.value}
                      label={day?.label}
                      disabled={
                        form.values?.days?.length <= 1 &&
                        day?.value === form.values?.days[0]
                      }
                    />
                  ))}
                </Flex>
              </Checkbox.Group>
            </>
          ) : null}
        </Paper>
      </Flex>
    </PageDialog>
  );
};

export default FormWorkSchedule;

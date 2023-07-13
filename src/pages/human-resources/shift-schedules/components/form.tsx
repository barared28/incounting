import PageDialog from "@/components/page-dialog";
import { TPageDialogType } from "@/types";
import {
  ActionIcon,
  Flex,
  Paper,
  TextInput,
  Textarea,
  rem,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { useRef } from "react";
import useFormShiftSchedule from "../hooks/use-form";
import useSaveShiftSchedule from "../hooks/use-save";

interface IProps {
  opened: boolean;
  onClose: () => void;
  data: any;
  type: TPageDialogType;
}

const FormShiftSchedule = (props: IProps) => {
  const { opened, onClose, data, type } = props;
  const refStart = useRef<any>();
  const refEnd = useRef<any>();
  const refStartBreak = useRef<any>();
  const refEndBreak = useRef<any>();
  const { form } = useFormShiftSchedule(data);
  const { handleSave, loading } = useSaveShiftSchedule();

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = (val: any) => {
    handleSave({
      payload: val,
      type,
      id: data?.id || "",
      callback: handleClose,
    });
  };

  return (
    <PageDialog
      show={opened}
      onCancel={handleClose}
      title={
        type === "create" ? "Create Shift Schedule" : "Update Shift Schedule"
      }
      onSubmit={form.onSubmit((val) => handleSubmit(val))}
      loading={loading}
    >
      <Paper p="xl" w="100%" maw={rem("620px")} radius="sm">
        <TextInput label="Name" withAsterisk {...form.getInputProps("name")} />
        <Flex justify="space-between" gap="md" mt="sm">
          <TimeInput
            w="100%"
            label="Start Time"
            ref={refStart}
            rightSection={
              <ActionIcon onClick={() => refStart?.current?.showPicker()}>
                <IconClock size="1rem" stroke={1.5} />
              </ActionIcon>
            }
            withAsterisk
            {...form.getInputProps("start_time")}
          />
          <TimeInput
            w="100%"
            label="End Time"
            ref={refEnd}
            rightSection={
              <ActionIcon onClick={() => refEnd?.current?.showPicker()}>
                <IconClock size="1rem" stroke={1.5} />
              </ActionIcon>
            }
            withAsterisk
            {...form.getInputProps("end_time")}
          />
        </Flex>
        <Flex justify="space-between" gap="md" mt="sm">
          <TimeInput
            w="100%"
            label="Break Time Start"
            ref={refStartBreak}
            rightSection={
              <ActionIcon onClick={() => refStartBreak?.current?.showPicker()}>
                <IconClock size="1rem" stroke={1.5} />
              </ActionIcon>
            }
            withAsterisk
            {...form.getInputProps("start_break")}
          />
          <TimeInput
            w="100%"
            label="Break Time End"
            ref={refEndBreak}
            rightSection={
              <ActionIcon onClick={() => refEndBreak?.current?.showPicker()}>
                <IconClock size="1rem" stroke={1.5} />
              </ActionIcon>
            }
            withAsterisk
            {...form.getInputProps("end_break")}
          />
        </Flex>
        <Textarea
          label="Description"
          mt="sm"
          {...form.getInputProps("description")}
        />
      </Paper>
    </PageDialog>
  );
};

export default FormShiftSchedule;

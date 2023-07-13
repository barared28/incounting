import MultipleSelectEmployee from "@/components/multiple-select/employee";
import {
  deleteWorkSchedule,
  getEmployeeWorkSchedule,
} from "@/services/work-schedules";
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconClock, IconTrash, IconUser } from "@tabler/icons-react";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useSaveWorkSchedule from "../../hooks/use-save";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";

interface IProps {
  opened: boolean;
  onClose: () => void;
  date: string;
  shifting: any;
  type: "view" | "edit" | null;
}

const convertTime = (time: string) => {
  const timeArr = time.split(":");
  timeArr.pop();
  return timeArr.join(":");
};

const DetailSchedules = (props: IProps) => {
  const { opened, onClose, shifting, type, date } = props;
  if (!opened) return null;
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [isAdd, { open: openAdd, close: closeAdd }] = useDisclosure();
  const query = useQuery(["shifting-employee", shifting?.id], () =>
    getEmployeeWorkSchedule({
      shifting_id: shifting?.id,
      date,
    })
  );
  const { mutate: mutateDelete, isLoading: loadingDelete } = useMutation((id) =>
    deleteWorkSchedule({ shifting_id: shifting?.id, employee_id: id, date })
  );
  const { handleSave, loading } = useSaveWorkSchedule();

  const schema = Yup.object({
    employee_ids: Yup.array()
      .required(t("required", { key: "Employee" }) || "")
      .min(1, t("required", { key: "Employee" }) || ""),
  });

  const form = useForm({
    initialValues: {
      employee_ids: [],
    },
    validate: yupResolver(schema),
  });

  useEffect(() => {
    query.refetch();
  }, [date, shifting?.id]);

  return (
    <Modal opened={opened} onClose={onClose} title="Detail Schedules">
      <Flex justify="space-between" align="center">
        <Text>{shifting?.name}</Text>
        <Flex gap="xs" align="center">
          <IconClock size={18} />
          <Text size="sm">
            {`${convertTime(shifting?.start_time)} - ${convertTime(
              shifting?.end_time
            )}`}
          </Text>
        </Flex>
      </Flex>
      <Divider my="sm" />
      <Text size="md">Employee</Text>
      <Flex direction="column" gap="md" mt="sm">
        {query?.data?.contacts?.map((val: any) => (
          <Flex justify="space-between">
            <Flex align="center" gap="xs">
              <IconUser size={18} />
              <Text size="xs">{val?.nickname}</Text>
            </Flex>
            <Box>
              {type === "edit" ? (
                <ActionIcon
                  variant="transparent"
                  color="red"
                  onClick={() => {
                    mutateDelete(val?.id, {
                      onSuccess: () => {
                        query.refetch();
                        queryClient.invalidateQueries(
                          "work-schedules-calendar"
                        );
                      },
                    });
                  }}
                  disabled={loadingDelete}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              ) : null}
            </Box>
          </Flex>
        )) || null}
      </Flex>
      {type === "edit" ? (
        <>
          {isAdd ? (
            <>
              <MultipleSelectEmployee
                mt="md"
                {...form.getInputProps("employee_ids")}
              />
              <Button
                mt="md"
                variant="light"
                fullWidth
                loading={loading}
                onClick={() => {
                  form.onSubmit((val) => {
                    handleSave({
                      payload: {
                        employee_ids: val?.employee_ids,
                        shifting_id: shifting?.id,
                        start_effective_date: date,
                        repeat_on: false,
                      },
                      callback: () => {
                        query.refetch();
                        queryClient.invalidateQueries(
                          "work-schedules-calendar"
                        );
                        closeAdd();
                        form.reset();
                      },
                    });
                  })();
                }}
              >
                Submit
              </Button>
            </>
          ) : (
            <Button mt="md" variant="light" fullWidth onClick={openAdd}>
              Add Employee
            </Button>
          )}
        </>
      ) : null}
    </Modal>
  );
};

export default DetailSchedules;

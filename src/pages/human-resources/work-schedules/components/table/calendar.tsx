import Calendar from "@/components/calendar";
import { useDataWorkSchedulesCalendar } from "../../hooks/use-data";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  ActionIcon,
  Box,
  Card,
  Flex,
  ScrollArea,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconPencil, IconSquarePlus } from "@tabler/icons-react";
import { IconUsers } from "@tabler/icons-react";
import DetailSchedules from "../modal/datail-schedules";
import { useDisclosure } from "@mantine/hooks";
import ModalAddSchedules from "../modal/add-schedules";
import SelectShifting from "@/components/select/shifting";

const TableCalendar = () => {
  const [data, setData] = useState<any>([]);
  const [filterCalendar, setFilterCalendar] = useState<any>(moment());
  const [typeDetail, setTypeDetail] = useState<"view" | "edit" | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(""); // YYYY-MM-DD
  const [selectedShifting, setSelectedShifting] = useState<string>("");
  const [showModalDetail, { open: openModalDetail, close: closeModalDetail }] =
    useDisclosure();
  const [showModalAdd, { open: openModalAdd, close: closeModalAdd }] =
    useDisclosure();
  const {
    data: dataRaw,
    isLoading,
    isRefetching,
    setShiftingId,
  } = useDataWorkSchedulesCalendar({
    year: moment(filterCalendar).format("YYYY"),
    month: moment(filterCalendar).format("MM"),
  });
  const handleShowModalAdd = (date: string) => {
    setSelectedDate(date);
    openModalAdd();
  };
  const handleShowModalEdit = (date: string, id: string, type: any) => {
    setSelectedDate(date);
    setSelectedShifting(id);
    setTypeDetail(type);
    openModalDetail();
  };
  useEffect(() => {
    if (dataRaw) {
      const res = dataRaw?.map((item: any) => {
        return {
          date: moment(item?.date).format("YYYY-MM-DD"),
          content: (
            <Box px="xs" w="100%" h="100%">
              <Flex justify="end" my="xs">
                <Tooltip label="Add Work Schedules">
                  <ActionIcon
                    color="blue"
                    onClick={() =>
                      handleShowModalAdd(
                        moment(item?.date).format("YYYY-MM-DD")
                      )
                    }
                  >
                    <IconSquarePlus />
                  </ActionIcon>
                </Tooltip>
              </Flex>
              <ScrollArea.Autosize h={120} scrollbarSize={6}>
                <Flex direction="column" gap="xs">
                  {item?.shiftings?.map((val: any) => (
                    <Card py={4} px={10}>
                      <Flex justify="space-between" align="center" gap="xs">
                        <Text size="xs">{val?.name}</Text>
                        <Flex gap={4}>
                          <Flex align="center">
                            <ActionIcon
                              variant="transparent"
                              onClick={() => {
                                handleShowModalEdit(
                                  moment(item?.date).format("YYYY-MM-DD"),
                                  val,
                                  "view"
                                );
                              }}
                            >
                              <IconUsers size={14} />
                            </ActionIcon>
                            <Text size="xs" color="gray" ml={-5}>
                              {val?.total_employee || 0}
                            </Text>
                          </Flex>
                          <ActionIcon
                            variant="transparent"
                            onClick={() => {
                              handleShowModalEdit(
                                moment(item?.date).format("YYYY-MM-DD"),
                                val,
                                "edit"
                              );
                            }}
                          >
                            <IconPencil size={14} />
                          </ActionIcon>
                        </Flex>
                      </Flex>
                    </Card>
                  )) || null}
                </Flex>
              </ScrollArea.Autosize>
            </Box>
          ),
        };
      });
      setData(res);
    }
  }, [dataRaw]);
  return (
    <>
      <Calendar
        leftContent={
          <SelectShifting
            maw={250}
            data={[]}
            placeholder="Filter Shift"
            clearable
            withinPortal
            disabled={isLoading || isRefetching}
            onChange={(value) => {
              setShiftingId(value || "");
            }}
          />
        }
        contents={data}
        value={moment(filterCalendar).format("MM-YYYY")}
        onChange={(value) => {
          setFilterCalendar(moment(value, "MM-YYYY"));
        }}
        loading={isLoading}
      />
      <DetailSchedules
        date={selectedDate}
        shifting={selectedShifting}
        opened={showModalDetail}
        onClose={closeModalDetail}
        type={typeDetail}
      />
      <ModalAddSchedules
        date={selectedDate}
        opened={showModalAdd}
        onClose={closeModalAdd}
      />
    </>
  );
};

export default TableCalendar;

import {
  ActionIcon,
  Box,
  Card,
  Flex,
  ScrollArea,
  Table,
  Text,
  createStyles,
} from "@mantine/core";
import { useDataWorkSchedulesTimeline } from "../../hooks/use-data";
import { caculateVwPx } from "@/utils/styles";
import useSidebar from "@/store/useSidebar";
import { IconSquareRoundedPlus, IconSquareRoundedX } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import SelectCustomers from "@/components/select/customers";
import SelectDepartment from "@/components/select/department";
import { useDisclosure } from "@mantine/hooks";
import ModalAddShifting from "../modal/add-shifting";
import { useEffect, useState } from "react";
import moment from "moment";

const useStyles = createStyles((theme) => ({
  columnFixed: {
    minWidth: "200px",
    position: "sticky",
    left: 0,
    zIndex: 1,
    backgroundColor: theme.colors.gray[0],
  },
  column: {
    minWidth: "200px",
  },
  columnAction: {
    minWidth: "200px",
    padding: "12px 0 !important",
  },
}));

const generateColumnDate = (from: Date, end: Date) => {
  const dates = [];
  let currentDate = from;
  while (currentDate <= end) {
    dates.push(currentDate);
    currentDate = moment(currentDate).add(1, "days").toDate();
  }
  return dates?.map((item) => moment(item).format("YYYY-MM-DD"));
};

const TableTimeline = () => {
  const { data } = useDataWorkSchedulesTimeline({
    limit: 10,
    page: 1,
  });
  const { expanded } = useSidebar();
  const { classes } = useStyles();
  const [showForm, { toggle }] = useDisclosure();
  const [filterDate, setFilterDate] = useState<any>([
    moment(),
    moment().endOf("month"),
  ]);
  const [filterEmployee, setFilterEmployee] = useState("");
  const [filterDivision, setFilterDivision] = useState("");
  const [dates, setDates] = useState<any>([]);

  useEffect(() => {
    if (filterDate[1]) {
      const resDates = generateColumnDate(filterDate[0], filterDate[1]);
      console.log(resDates);
      setDates(resDates);
    }
  }, [filterDate]);
  return (
    <>
      <Flex gap="md" mt="md">
        <DatePickerInput
          type="range"
          w={300}
          description="Filter Date"
          onChange={setFilterDate}
          value={filterDate}
        />
        <SelectCustomers
          filterType={3}
          label=""
          placeholder=""
          description="Filter Employee"
          clearable
          value={filterEmployee}
          onChange={(val) => setFilterEmployee(val || "")}
        />
        <SelectDepartment
          label=""
          description="Filter Division"
          clearable
          value={filterDivision}
          onChange={(val) => setFilterDivision(val || "")}
        />
      </Flex>
      <ScrollArea
        w="100%"
        maw={expanded ? caculateVwPx(325) : caculateVwPx(190)}
        mt="md"
        scrollbarSize={8}
        offsetScrollbars
      >
        <Table verticalSpacing="lg" withBorder>
          <thead>
            <tr>
              <th className={classes.columnFixed}>Employee Name</th>
              <th className={classes.column}>Division</th>
              {dates?.map((val: any) => (
                <th className={classes.column}>{val}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: any) => (
              <tr>
                <td className={classes.columnFixed}>{item?.nickname}</td>
                <td>Software Engineer</td>
                {dates?.map((date: string) => {
                  const shiftings = item?.schedules?.find(
                    (schedule: any) =>
                      date === moment(schedule?.date).format("YYYY-MM-DD")
                  );

                  return (
                    <td className={classes.columnAction}>
                      <Box w="100%" h="100%">
                        <ActionIcon
                          color="blue"
                          variant="transparent"
                          ml="sm"
                          onClick={toggle}
                        >
                          <IconSquareRoundedPlus />
                        </ActionIcon>
                        <Flex direction="column" gap="sm" px="sm">
                          <Card py={4} px={6}>
                            <Flex justify="space-between" align="center">
                              <Text size="xs">Shift Pagi</Text>
                              <ActionIcon variant="transparent" color="red">
                                <IconSquareRoundedX size={18} />
                              </ActionIcon>
                            </Flex>
                          </Card>
                        </Flex>
                      </Box>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
      <ModalAddShifting show={showForm} onClose={toggle} />
    </>
  );
};

export default TableTimeline;

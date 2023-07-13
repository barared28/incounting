import {
  ActionIcon,
  Box,
  Center,
  Flex,
  LoadingOverlay,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import moment from "moment";
import { useEffect, useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const initialData = [
  [{}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}],
];

type TDate = {
  date: number;
  day: number;
  fullDate: string;
  month: string;
  year: string; // format: YYYY
};

const getDate = (val = null): TDate[] => {
  const month = val ? moment(val, "MM-YYYY").format("M") : moment().format("M");
  const daysInMonth = val
    ? moment(val, "MM-YYYY").daysInMonth()
    : moment().daysInMonth();
  const year = val
    ? moment(val, "MM-YYYY").format("YYYY")
    : moment().format("YYYY");

  const store = [];

  for (let i = 1; i <= +daysInMonth; i++) {
    const fullDate = moment(`${i}-${month}-${year}`, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const day = moment(fullDate, "YYYY-MM-DD").isoWeekday();
    store.push({ day, month, year, date: i, fullDate });
  }

  return store;
};

type TContent = {
  date?: string; // YYYY-MM-DD
  content?: any;
};

type TCalendarProps = {
  value?: string; // format: MM-YYYY
  onChange?: (val: string) => void; // format: MM-YYYY
  contents?: TContent[];
  leftContent?: any;
  rightContent?: any;
  loading?: boolean;
};

const Calendar = (props: TCalendarProps) => {
  const { value, onChange, contents, leftContent, rightContent, loading } =
    props;
  const theme = useMantineTheme();
  const [dates, setDates] = useState<TContent[][]>(initialData);
  const [selectedDate, setSelectedDate] = useState(moment());
  const generateDataColumn = (date: any) => {
    const resDates = getDate(date);
    const datesWithContent = resDates.map((val) => {
      const find = contents?.find((it) => it.date === val.fullDate);
      return {
        ...val,
        content: find?.content,
      };
    });
    let isFind = false;
    let indexDates = 0;
    const res: TContent[][] = initialData.map((val) => {
      const result = val.map((_, index) => {
        if (!isFind && index + 1 === datesWithContent[indexDates].day) {
          isFind = true;
        }
        if (isFind && datesWithContent[indexDates]) {
          const resIndex = indexDates;
          indexDates += 1;
          return datesWithContent[resIndex];
        }
        return {};
      });
      return result;
    });

    if (datesWithContent[indexDates]) {
      const add = [{}, {}, {}, {}, {}, {}, {}].map(() => {
        if (datesWithContent[indexDates]) {
          const resIndex = indexDates;
          indexDates = indexDates + 1;
          return datesWithContent[resIndex];
        }
        return {};
      });
      res.push(add);
    }
    setDates(res);
  };
  useEffect(() => {
    generateDataColumn(selectedDate);
  }, [selectedDate, contents]);
  useEffect(() => {
    if (value) {
      const res = moment(value, "MM-YYYY");
      setSelectedDate(res);
    }
  }, [value]);
  const handlePrevMonth = () => {
    const res = moment(selectedDate).subtract(1, "month");
    setSelectedDate(res);
    onChange && onChange(res.format("MM-YYYY"));
  };
  const handleNextMonth = () => {
    const res = moment(selectedDate).add(1, "month");
    setSelectedDate(res);
    onChange && onChange(res.format("MM-YYYY"));
  };
  return (
    <Box pos="relative">
      <Flex w="100%" align="center" my="md">
        <Box w="100%">{leftContent || null}</Box>
        <Box w="100%">
          <Flex justify="center" align="center" gap="sm">
            <ActionIcon onClick={() => handlePrevMonth()}>
              <IconChevronLeft size={24} />
            </ActionIcon>
            <Center miw={250}>
              <Text size={28} weight={600}>
                {moment(selectedDate).format("MMMM YYYY")}
              </Text>
            </Center>
            <ActionIcon onClick={() => handleNextMonth()}>
              <IconChevronRight size={24} />
            </ActionIcon>
          </Flex>
        </Box>
        <Box w="100%">{rightContent || null}</Box>
      </Flex>
      <table
        width="100%"
        style={{
          borderSpacing: 0,
          borderCollapse: "collapse",
          tableLayout: "fixed",
          position: "relative",
        }}
      >
        <LoadingOverlay
          visible={loading || false}
          overlayColor={
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[1]
          }
        />
        <thead>
          <tr>
            {days.map((val) => (
              <th
                style={{
                  padding: "4px",
                  width: "100%",
                }}
              >
                <Text size="sm" weight={500}>
                  {val}
                </Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dates.map((val) => (
            <tr style={{ border: "1px solid black", padding: 0 }}>
              {val.map((it: any) => (
                <td
                  style={{
                    height: "180px",
                    border: "1px solid black",
                    position: "relative",
                    padding: "0",
                  }}
                >
                  {it?.date ? (
                    <Flex
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        padding: "2px 4px",
                        borderRadius: "0 0 10px 0",
                      }}
                      bg="blue"
                      miw={20}
                      justify="center"
                    >
                      <Text size="xs" weight={500} color="white">
                        {it?.date}
                      </Text>
                    </Flex>
                  ) : null}
                  {it?.content || null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default Calendar;

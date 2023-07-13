import { Box, Button, Checkbox, Flex, Group, Title } from "@mantine/core";
import { DatePickerInput, MonthPickerInput } from "@mantine/dates";
import { IconReport } from "@tabler/icons-react";
import ListDragDrop from "./components/list-drag-drop";
import useFormDailySalesReport from "./hooks/use-form";
import ReportsPageDialog from "./components/reports";
import useFormPage from "@/hooks/useFormPage";
import { useState } from "react";
import { IParamsDailySalesReport } from "@/services/daily-sales-report";
import useDragDrop from "./hooks/use-drag-drop";

const DailySalesReport = () => {
  const form = useFormDailySalesReport();
  const [params, setParams] = useState<IParamsDailySalesReport | null>(null);
  const { showForm, handleClose, setShowForm } = useFormPage();
  const { list, handleChange } = useDragDrop(form.values?.reports || []);
  return (
    <Box>
      <Title size={24} weight={500} mb={32}>
        Daily Sales Report
      </Title>
      <Flex justify="center">
        <Flex direction="column" gap="md" maw={650} p="xl">
          <Flex direction="column" gap="xs">
            <DatePickerInput
              label="Filter Daily"
              description="Date"
              w="100%"
              withAsterisk
              {...form.getInputProps("date")}
            />
            <Checkbox
              label="With Monthly Reports"
              {...form.getInputProps("withMonth", { type: "checkbox" })}
            />
            {form.values?.withMonth ? (
              <MonthPickerInput
                description="Month"
                w="100%"
                disabled
                {...form.getInputProps("date")}
              />
            ) : null}
          </Flex>
          <Checkbox.Group
            label="Reports"
            description="select which reports you want to display"
            withAsterisk
            required
            {...form.getInputProps("reports")}
          >
            <Group mt="xs">
              <Checkbox label="Room Statistic" value="room_statistic" />
              <Checkbox label="Room Revenue" value="room_revenue" />
              <Checkbox label="Average Rate" value="average_rate" />
              <Checkbox label="Daily Sales Report" value="daily_sales_report" />
            </Group>
          </Checkbox.Group>
          <ListDragDrop list={list} handleChange={handleChange} />
          <Button
            leftIcon={<IconReport size={18} />}
            onClick={() => {
              form.onSubmit((val) => {
                setShowForm(true);
                setParams(val);
              })();
            }}
          >
            Generate Report
          </Button>
        </Flex>
      </Flex>
      <ReportsPageDialog
        params={params}
        show={showForm}
        onClose={handleClose}
        reports={list?.map((item: any) => item.key) || []}
      />
    </Box>
  );
};

export default DailySalesReport;

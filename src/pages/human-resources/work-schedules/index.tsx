import useFormPage from "@/hooks/useFormPage";
import { Box, Button, Flex, Tabs, Title } from "@mantine/core";
import {
  IconCalendarEvent,
  IconTimelineEventExclamation,
} from "@tabler/icons-react";
import FormWorkSchedule from "./components/form";
import TableCalendar from "./components/table/calendar";
import TableTimeline from "./components/table/timeline";

const WorkSchedules = () => {
  const { showForm, setShowForm } = useFormPage();
  return (
    <Box>
      <Flex justify="space-between" align="center" mb={20}>
        <Title size={24} weight={500}>
          Work Schedules
        </Title>
        <Button onClick={() => setShowForm(true)}>Create New</Button>
      </Flex>
      <Tabs
        variant="outline"
        defaultValue="calendar"
        radius="md"
        keepMounted={false}
      >
        <Tabs.List>
          <Tabs.Tab value="calendar" icon={<IconCalendarEvent size={18} />}>
            Calendar
          </Tabs.Tab>
          <Tabs.Tab
            value="timeline"
            icon={<IconTimelineEventExclamation size={18} />}
          >
            Timeline
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="calendar">
          <TableCalendar />
        </Tabs.Panel>
        <Tabs.Panel value="timeline">
          <TableTimeline />
        </Tabs.Panel>
      </Tabs>
      <FormWorkSchedule opened={showForm} onClose={() => setShowForm(false)} />
    </Box>
  );
};

export default WorkSchedules;

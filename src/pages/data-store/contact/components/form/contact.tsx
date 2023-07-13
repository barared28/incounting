import SelectDepartment from "@/components/select/department";
import { Checkbox, Flex, Group, Paper, TextInput, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";

interface IProps {
  form: UseFormReturnType<any>;
  disabled?: boolean;
}

const ContactSection = (props: IProps) => {
  const { form, disabled } = props;
  return (
    <Paper p="xl" w="100%" radius="sm">
      <Flex direction="column" w="100%" gap="sm">
        <Text weight={500}>Info Contact</Text>
        <TextInput
          label="Nickname"
          withAsterisk
          w="100%"
          disabled={disabled}
          {...form.getInputProps("name")}
        />
        <SelectDepartment
          disabled={disabled}
          withAsterisk
          {...form.getInputProps("department")}
        />
        <Checkbox.Group
          label="Contact Type"
          withAsterisk
          {...form.getInputProps("contact_type")}
        >
          <Group mt="xs">
            <Checkbox disabled={disabled} value="customer" label="Customer" />
            <Checkbox disabled={disabled} value="supplier" label="Supplier" />
            <Checkbox disabled={disabled} value="employee" label="Employee" />
            <Checkbox disabled={disabled} value="other" label="Other" />
          </Group>
        </Checkbox.Group>
        <DatePickerInput
          label="Join Date"
          icon={<IconCalendar size={18} />}
          clearable
          disabled={disabled}
          {...form.getInputProps("join_date")}
        />
      </Flex>
    </Paper>
  );
};

export default ContactSection;

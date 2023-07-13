import SelectCustomers from "@/components/select/customers";
import { Flex, Paper, Text, rem } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface IProps {
  form: UseFormReturnType<any>;
}

const CustomerFormSection = (props: IProps) => {
  const { form } = props;
  return (
    <Paper p="xl" w="100%" radius="sm">
      <Flex direction="column" gap="sm" maw={rem("620px")}>
        <Text weight={500}>Customer Information</Text>
        <SelectCustomers filterType={2} {...form.getInputProps("contact_id")} />
      </Flex>
    </Paper>
  );
};

export default CustomerFormSection;

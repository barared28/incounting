import SelectBankCategory from "@/components/select/bank-category";
import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  Paper,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";

interface IProps {
  form: UseFormReturnType<any>;
  disabled?: boolean;
  handleAddBank: () => void;
  handleRemoveBank: (index: number) => void;
  selectedData?: any[];
}

const BankSection = (props: IProps) => {
  const { form, disabled, handleAddBank, handleRemoveBank, selectedData } =
    props;

  return (
    <Paper p="xl" w="100%" radius="sm">
      <Flex direction="column" gap="sm">
        <Text weight={500}>Banks</Text>
        <Divider variant="dashed" />
        {form.values?.banks?.map((_: any, index: number) => (
          <>
            <Flex justify="end">
              <Tooltip label="Remove Bank">
                <ActionIcon
                  onClick={() => handleRemoveBank(index)}
                  size="sm"
                  color="red"
                  variant="transparent"
                >
                  <IconTrash />
                </ActionIcon>
              </Tooltip>
            </Flex>
            <SelectBankCategory
              {...form.getInputProps(`banks.${index}.bank_category_id`)}
              disabled={disabled}
              withAsterisk
              label="Bank Name"
              selectedData={
                selectedData ? selectedData[index]?.bank_category || {} : {}
              }
            />
            <TextInput
              {...form.getInputProps(`banks.${index}.branch_office`)}
              disabled={disabled}
              withAsterisk
              label="Branch Office"
            />
            <TextInput
              {...form.getInputProps(`banks.${index}.account_name`)}
              disabled={disabled}
              withAsterisk
              label="Account Name"
            />
            <TextInput
              {...form.getInputProps(`banks.${index}.account_number`)}
              disabled={disabled}
              withAsterisk
              label="Account Number"
            />
            <Divider variant="dashed" mt="sm" />
          </>
        ))}
        <Button onClick={handleAddBank} disabled={disabled}>Add Bank</Button>
      </Flex>
    </Paper>
  );
};

export default BankSection;

import SelectBankCategory from "@/components/select/bank-category";
import { Button, Divider, Flex, Modal, Text, TextInput } from "@mantine/core";
import { useAddBankUser } from "../hooks";

interface IProps {
  onClose: () => void;
  opened: boolean;
  contactId: number;
}

const AddBankUserModal = (props: IProps) => {
  const { opened, contactId, onClose } = props;
  const { handleAddBank, form, loading } = useAddBankUser(contactId, opened);
  return (
    <Modal.Root opened={opened} onClose={onClose} closeOnClickOutside={false}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Text weight={500}>Add Bank User</Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Divider />
        <Modal.Body py="md">
          <Flex direction="column" gap="sm" mt="md">
            <SelectBankCategory
              label="Bank Name"
              withAsterisk
              {...form.getInputProps("bank_category_id")}
            />
            <TextInput
              label="Branch Office"
              withAsterisk
              {...form.getInputProps("branch_office")}
            />
            <TextInput
              label="Account Name"
              withAsterisk
              {...form.getInputProps("account_name")}
            />
            <TextInput
              label="Account Number"
              withAsterisk
              {...form.getInputProps("account_number")}
            />
          </Flex>
          <Flex mt="md" justify="flex-end">
            <Flex gap="sm">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="blue"
                onClick={() => form.onSubmit(() => handleAddBank(onClose))()}
                loading={loading}
              >
                Create
              </Button>
            </Flex>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default AddBankUserModal;

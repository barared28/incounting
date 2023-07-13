import {
  Button,
  Divider,
  FileButton,
  FileInput,
  Flex,
  Image,
  Modal,
  Select,
  Text,
} from "@mantine/core";
import ImageReceipt from "@/assets/images/payment-recipe.png";
import { IconUpload } from "@tabler/icons-react";
import SelectBankUser from "@/components/select/bank-user";

interface IProps {
  onClose: () => void;
  opened: boolean;
  contactId: number;
  handleAddBank?: () => void;
}

const ApproveUploadModal = (props: IProps) => {
  const { opened, onClose, contactId, handleAddBank } = props;
  return (
    <Modal.Root opened={opened} onClose={onClose} closeOnClickOutside={false}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Text weight={500}>Payment Statement</Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Divider />
        <Modal.Body>
          <Flex mt="md" direction="column" justify="center" align="center">
            <Image src={ImageReceipt} width={250} withPlaceholder />
            <Text align="center" my="md" size="sm" maw={320}>
              Update the payment status from "unpaid" to "paid" by uploading the
              payment receipt
            </Text>
            <Flex gap="md" mb="md">
              <Select
                description="Payment Method"
                defaultValue="1"
                clearable={false}
                data={[{ value: "1", label: "Bank Transfer" }]}
              />
              <SelectBankUser
                description="Bank"
                contactId={contactId}
                handleAddBank={handleAddBank}
              />
            </Flex>
            <FileInput
              w="100%"
              icon={<IconUpload size={18} />}
              mb="md"
              accept="image/*"
            />
            <FileButton onChange={() => {}}>
              {(propsUpload) => (
                <Button w={150} mb="md" {...propsUpload}>
                  Upload
                </Button>
              )}
            </FileButton>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ApproveUploadModal;

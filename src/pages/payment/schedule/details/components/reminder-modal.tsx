import { Button, Center, Flex, Image, Modal, Text } from "@mantine/core";
import WarningImage from "@/assets/images/confirm-sending.png";

interface IProps {
  onClose: () => void;
  opened: boolean;
}

const ReminderModal = (props: IProps) => {
  const { opened, onClose } = props;
  return (
    <Modal
      opened={opened}
      onClose={() => {}}
      withCloseButton={false}
      padding="xl"
      centered
    >
      <Center>
        <Image src={WarningImage} width={250} withPlaceholder />
      </Center>
      <Text align="center" size="lg" weight={500} mt="md">
        Are you sure?
      </Text>
      <Text align="center">
        Are you sure that you want to send email notification for payment
        schedule to customer ?
      </Text>
      <Flex justify="center" gap="xl" mt="md">
        <Button variant="outline" miw={120} onClick={() => onClose()}>
          Cancel
        </Button>
        <Button miw={120}>Confirm</Button>
      </Flex>
    </Modal>
  );
};

export default ReminderModal;

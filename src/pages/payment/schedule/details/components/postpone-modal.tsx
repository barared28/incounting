import { Button, Center, Flex, Image, Modal, Text } from "@mantine/core";
import WarningImage from "@/assets/images/warning-confirm.png";
import { usePostponePaymentScheduleDetails } from "../hooks";

interface IProps {
  onClose: () => void;
  opened: boolean;
  idPaymentSchedule: number;
}

const PostponeModal = (props: IProps) => {
  const { opened, onClose, idPaymentSchedule } = props;
  const { handlePostpone, isLoading } =
    usePostponePaymentScheduleDetails(idPaymentSchedule);
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
        Are you sure that you want to postpone the payment?
      </Text>
      <Flex justify="center" gap="xl" mt="md">
        <Button variant="outline" miw={120} onClick={() => onClose()}>
          Cancel
        </Button>
        <Button
          loading={isLoading}
          miw={120}
          onClick={() => handlePostpone(onClose)}
        >
          Confirm
        </Button>
      </Flex>
    </Modal>
  );
};

export default PostponeModal;

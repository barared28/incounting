import SelectShifting from "@/components/select/shifting";
import { Button, Flex, Modal } from "@mantine/core";

interface IProps {
  show: boolean;
  onClose: () => void;
}

const ModalAddShifting = (props: IProps) => {
  const { onClose, show } = props;
  return (
    <Modal onClose={onClose} opened={show} title="Add Work Schedules">
      <Flex direction="column" gap="md">
        <SelectShifting data={[]} withinPortal />
        <Button>Save</Button>
      </Flex>
    </Modal>
  );
};

export default ModalAddShifting;

import { Button, Flex, Modal, Text, useMantineTheme } from "@mantine/core";
import { IconCircleX } from "@tabler/icons-react";

interface IProps {
  opened: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  loading?: boolean;
}

const DeleteConfirm = (props: IProps) => {
  const { opened, onClose = () => {}, onConfirm = () => {}, loading } = props;
  const theme = useMantineTheme();
  return (
    <Modal opened={opened} onClose={onClose} title=" ">
      <Flex align="center" direction="column">
        <IconCircleX size={60} color={theme.colors.red[6]} />
        <Text size={18} weight={500}>
          Are you sure?
        </Text>
        <Text align="center">
          Do you really want to delete these records? This process cannot be
          undone.
        </Text>
        <Flex gap="lg" my={16}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button color="red" onClick={onConfirm} loading={loading}>
            Delete
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default DeleteConfirm;

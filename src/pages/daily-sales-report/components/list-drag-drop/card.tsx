import { ActionIcon, Flex, Paper, Text, Transition } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface ICardProps {
  title: string;
  icon: any;
}

const Card = (props: ICardProps) => {
  const { title, icon } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Transition mounted={mounted} transition="pop">
      {(styles) => (
        <Paper style={styles} px="md" py="sm">
          <Flex align="center" gap="md" justify="space-between">
            <Flex align="center" gap="sm">
              {icon}
              <Text size="sm">{title}</Text>
            </Flex>
            <ActionIcon variant="transparent">
              <IconGripVertical size={18} />
            </ActionIcon>
          </Flex>
        </Paper>
      )}
    </Transition>
  );
};

export default Card;

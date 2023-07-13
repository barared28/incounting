import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

interface IGenerateNotif {
  type: "success" | "failed" | "progress";
  message: string;
  id?: string;
}

const generateNotif = (props: IGenerateNotif) => {
  const { type, message, id } = props;

  switch (type) {
    case "failed":
      notifications.show({
        icon: <IconX size="1.1rem" />,
        message,
        color: "red",
        id,
      });
      break;
    case "progress":
      notifications.show({
        loading: true,
        message,
        withCloseButton: false,
        id,
      });
      break;
    case "success":
      notifications.show({
        icon: <IconCheck size="1.1rem" />,
        message,
        id,
        color: "green",
      });
      break;
    default:
      break;
  }
};

export default generateNotif;

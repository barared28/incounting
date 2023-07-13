import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";

interface IProps {
  type: string;
}

const useCustomTransaction = (props: IProps) => {
  const { type } = props;
  const [opened, { close, open }] = useDisclosure();
  const [id, setId] = useState<number>(0);
  const [titleDetails, setTitleDetails] = useState<string>("");
  const title = useMemo(() => {
    switch (type) {
      case "room":
        return "Detail Room";
      case "food_beverage":
        return "Detail Food & Beverage";
      case "in_room_service":
        return "Detail In Room Dining & Service";
      case "other":
        return "Detail Other";
      default:
        return "";
    }
  }, [type]);

  const handleOpen = (id: number, name: string) => {
    setId(id);
    setTitleDetails(`${title} - ${name}`);
    open();
  };

  const handleClose = () => {
    setId(0);
    setTitleDetails("");
    close();
  };

  return {
    title,
    titleDetails,
    openedDetails: opened,
    closeDetails: handleClose,
    openDetails: handleOpen,
    idDetails: id,
    setIdDetails: setId,
  };
};

export default useCustomTransaction;

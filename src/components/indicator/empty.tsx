import { Flex, Text } from "@mantine/core";
import { ReactComponent as EmptyIcon } from "@/assets/svg/empty_data.svg";
import { useTranslation } from "react-i18next";

const EmptyData = () => {
  const { t } = useTranslation();
  return (
    <Flex
      direction="column"
      w="100%"
      h={200}
      justify="center"
      align="center"
      my="xs"
      gap="sm"
    >
      <EmptyIcon style={{ transform: "scale(0.6)" }} />
      <Text
        size="sm"
        italic
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[0]
              : theme.colors.gray[5],
        })}
      >
        {t("empty_data")}
      </Text>
    </Flex>
  );
};

export default EmptyData;

import { Flex, Loader, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

const SimpleLoader = () => {
  const { t } = useTranslation();
  return (
    <Flex direction="column" align="center" gap="xs">
      <Loader />
      <Text size="xs" weight={500}>
        {t("loading")}
      </Text>
    </Flex>
  );
};

export default SimpleLoader;

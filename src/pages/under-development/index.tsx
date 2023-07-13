import { Button, Flex, Image, Text, rem } from "@mantine/core";
import ImageDevelopment from "@/assets/images/under-development.png";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const UnderDevelopment = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const handleRedirect = () => {
    window.open(state?.url, "_blank");
  };
  return (
    <Flex
      direction="column"
      w="100%"
      h="100%"
      justify="center"
      align="center"
      gap="lg"
      py="lg"
    >
      <Image
        src={ImageDevelopment}
        width={rem("500px")}
        height={rem("500px")}
        fit="cover"
      />
      <Text
        weight={500}
        size="lg"
        maw={state?.redirect ? 1000 : 700}
        align="center"
        italic
      >
        {t(state?.redirect ? "on_development_redirect" : "on_development")}
      </Text>
      {state?.redirect ? (
        <Button onClick={handleRedirect} variant="outline">
          {t("on_development_redirect_button")}
        </Button>
      ) : null}
    </Flex>
  );
};

export default UnderDevelopment;

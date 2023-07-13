import { Flex, Box, Image, rem, Text } from "@mantine/core";
import { useEffect } from "react";
import SwitchDarkMode from "@/components/switch/darkmode";
import Logo from "@/assets/images/logo.png";
import LogoWhite from "@/assets/images/logo-white.png";
import { useStylesRegister } from "./styles";
import FormRegister from "./components/form";
import { useTranslation } from "react-i18next";
import { changeTitlePage } from "@/utils";

const Register = () => {
  const { classes, theme } = useStylesRegister();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    changeTitlePage(t("register.title"));

    return () => {
      changeTitlePage();
    };
  }, [i18n.language]);

  return (
    <Flex
      className={classes.container}
      justify="center"
      align="center"
      direction="column"
    >
      <Box>
        <Image
          src={theme.colorScheme === "dark" ? LogoWhite : Logo}
          width={rem("250px")}
          height={rem("50px")}
          fit="cover"
          mb={rem("50px")}
        />
      </Box>
      <FormRegister />
      <Flex mt="xl">
        <Text size="xs" italic>{`Version ${APP_VERSION}`}</Text>
      </Flex>
      <Box className={classes["dark-mode"]}>
        <SwitchDarkMode />
      </Box>
    </Flex>
  );
};

export default Register;

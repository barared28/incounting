import { useEffect } from "react";
import { Flex, Text, Image, rem, Box } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { changeTitlePage } from "@/utils";
import Logo from "@/assets/images/logo.png";
import LogoWhite from "@/assets/images/logo-white.png";
import FormLogin from "./components/form";
import { useStylesLogin } from "./styles";
import SwitchDarkMode from "@/components/switch/darkmode";

const Login = () => {
  const { classes, theme } = useStylesLogin();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    changeTitlePage(t("login.title"));
    return () => {
      changeTitlePage();
    };
  }, [i18n.language]);

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      className={classes.container}
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
      <FormLogin />
      <Flex mt="xl">
        <Text size="xs" italic>{`Version ${APP_VERSION}`}</Text>
      </Flex>
      <Box className={classes["container-darkmode"]}>
        <SwitchDarkMode />
      </Box>
    </Flex>
  );
};

export default Login;

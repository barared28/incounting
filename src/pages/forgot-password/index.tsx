import {
  Flex,
  Card,
  rem,
  Box,
  Image,
  Text,
  Title,
  TextInput,
  Button,
  UnstyledButton,
  Transition,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useStylesForgot } from "./styles";
import SwitchDarkMode from "@/components/switch/darkmode";
import SelectLanguage from "@/components/select/lang";
import Logo from "@/assets/images/logo.png";
import LogoWhite from "@/assets/images/logo-white.png";
import { useTranslation } from "react-i18next";
import { useFormForgot } from "./hooks";
import { changeTitlePage } from "@/utils";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { t, i18n } = useTranslation();
  const { classes, theme } = useStylesForgot();
  const navigate = useNavigate();
  const form = useFormForgot();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    changeTitlePage(t("forgot_password.title"));

    return () => {
      changeTitlePage();
    };
  }, [i18n.language]);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

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
      <Transition mounted={mounted} transition="pop">
        {(styles) => (
          <Card
            style={styles}
            padding={rem("30px")}
            shadow="xl"
            className={classes.card}
          >
            <Flex mb="md" justify="space-between">
              <Title size={rem("25px")} color={theme.colors.blue[6]}>
                {t("forgot_password.title")}
              </Title>
              <SelectLanguage />
            </Flex>
            <form className={classes.form} onSubmit={form.onSubmit(() => {})}>
              <TextInput
                label="Email"
                withAsterisk
                type="email"
                {...form.getInputProps("email")}
              />
              <Button mt="sm" type="submit">
                {t("forgot_password.submit")}
              </Button>
            </form>
            <Flex justify="center" mt="sm">
              <Text size="xs">{t("forgot_password.back")}</Text>
              <UnstyledButton
                ml={rem("4px")}
                onClick={() => navigate("/login")}
              >
                <Text size="xs" color={theme.colors.blue[6]}>
                  {t("login.title")}
                </Text>
              </UnstyledButton>
            </Flex>
          </Card>
        )}
      </Transition>
      <Flex mt="xl">
        <Text size="xs" italic>{`Version ${APP_VERSION}`}</Text>
      </Flex>
      <Box className={classes["dark-mode"]}>
        <SwitchDarkMode />
      </Box>
    </Flex>
  );
};

export default ForgotPassword;

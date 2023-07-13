import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Flex,
  TextInput,
  Title,
  Text,
  UnstyledButton,
  rem,
  Box,
  Transition,
  PasswordInput,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import SelectLanguage from "@/components/select/lang";
import { useNavigate } from "react-router-dom";
import { useFormLogin, useHandleLogin } from "../hooks";
import { useStylesLogin } from "../styles";

const FormLogin = () => {
  const { classes, theme } = useStylesLogin();
  const form = useFormLogin();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const { handleLogin, isLoading } = useHandleLogin();

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return (
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
              {t("login.title")}
            </Title>
            <Box>
              <SelectLanguage />
            </Box>
          </Flex>
          <form className={classes.form} onSubmit={form.onSubmit(handleLogin)}>
            <TextInput
              label="Email"
              withAsterisk
              placeholder="example@incounting.com"
              id="email"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label={t("login.password")}
              withAsterisk
              placeholder="******"
              id="password"
              {...form.getInputProps("password")}
            />
            <Flex justify="end">
              <UnstyledButton onClick={() => navigate("/forgot-password")}>
                <Text size="xs" color={theme.colors.blue[6]}>
                  {t("login.forgot")}
                </Text>
              </UnstyledButton>
            </Flex>
            <Button type="submit" id="login-submit" loading={isLoading}>
              {t("login.title")}
            </Button>
          </form>
          <Flex justify="center" mt="lg">
            <Text size="xs">{t("login.dont_have")}</Text>
            <UnstyledButton
              ml={rem("4px")}
              onClick={() => navigate("/register")}
            >
              <Text size="xs" color={theme.colors.blue[6]}>
                {t("login.create")}
              </Text>
            </UnstyledButton>
          </Flex>
        </Card>
      )}
    </Transition>
  );
};

export default FormLogin;

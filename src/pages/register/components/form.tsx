import {
  Card,
  NumberInput,
  TextInput,
  Title,
  Transition,
  rem,
  Flex,
  Button,
  Text,
  UnstyledButton,
  PasswordInput,
} from "@mantine/core";
import { useFormRegister } from "../hooks";
import { useStylesRegister } from "../styles";
import SelectLanguage from "@/components/select/lang";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormRegister = () => {
  const { t } = useTranslation();
  const { theme, classes } = useStylesRegister();
  const form = useFormRegister();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

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
          shadow="xl"
          padding={rem("30px")}
          className={classes.card}
        >
          <Flex mb="md" justify="space-between">
            <Title size={rem("25px")} color={theme.colors.blue[6]}>
              {t("register.title")}
            </Title>
            <SelectLanguage />
          </Flex>
          <form className={classes.form} onSubmit={form.onSubmit(() => {})}>
            <TextInput
              label={t("register.name")}
              withAsterisk
              {...form.getInputProps("name")}
            />
            <NumberInput
              label={t("register.phone_number")}
              withAsterisk
              hideControls
              required
              {...form.getInputProps("phone_number")}
            />
            <TextInput
              label="Email"
              withAsterisk
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label={t("register.password")}
              withAsterisk
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label={t("register.password_confirm")}
              withAsterisk
              {...form.getInputProps("confirm_password")}
            />
            <Button type="submit" mt="lg">
              {t("register.title")}
            </Button>
            <Flex justify="center" mt="sm">
              <Text size="xs">{t("register.already")}</Text>
              <UnstyledButton
                ml={rem("4px")}
                onClick={() => navigate("/login")}
              >
                <Text size="xs" color={theme.colors.blue[6]}>
                  {t("login.title")}
                </Text>
              </UnstyledButton>
            </Flex>
          </form>
        </Card>
      )}
    </Transition>
  );
};

export default FormRegister;

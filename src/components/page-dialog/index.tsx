import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Image,
  ScrollArea,
  Text,
  Transition,
  rem,
} from "@mantine/core";
import { useStylesPageDialog } from "./styles";
import Logo from "@/assets/images/logo.png";
import LogoWhite from "@/assets/images/logo-white.png";
import { IconMaximize, IconMaximizeOff, IconX } from "@tabler/icons-react";
import SwitchDarkMode from "../switch/darkmode";
import SelectLanguage from "../select/lang";
import { useFullscreen } from "@mantine/hooks";
import useMounted from "@/hooks/useMounted";
import { TPageDialogType } from "@/types";
import { useTranslation } from "react-i18next";

interface IProps {
  show?: boolean;
  onCancel?: () => void;
  onSubmit?: () => void;
  children?: any;
  title?: string;
  loading?: boolean;
  type?: TPageDialogType;
  customFooter?: any;
}

const PageDialog = (props: IProps) => {
  const {
    show = false,
    onCancel = () => {},
    onSubmit = () => {},
    children = null,
    title = "",
    loading = false,
    type = "",
    customFooter = null,
  } = props;
  if (!show) return null;
  const { t } = useTranslation();
  const { mounted } = useMounted(show);
  const { toggle, fullscreen } = useFullscreen();
  const { classes, theme } = useStylesPageDialog();
  const cancelText = type === "view" ? t("close") : t("cancel");
  const submitText = type === "update" ? t("save") : "Submit";
  return (
    <Transition mounted={mounted} transition="fade" keepMounted={false}>
      {(styles) => (
        <Box style={styles} className={classes.container}>
          <Flex
            className={classes["container-header"]}
            justify="space-between"
            align="center"
          >
            <Box>
              {title ? (
                <Text weight={500} size="lg">
                  {title}
                </Text>
              ) : null}
            </Box>
            <Box>
              <ActionIcon onClick={onCancel} disabled={loading}>
                <IconX size={32} />
              </ActionIcon>
            </Box>
          </Flex>
          <Flex justify="center" pos="relative">
            <Box className={classes["container-logo"]}>
              <Image
                src={theme.colorScheme === "dark" ? LogoWhite : Logo}
                width={rem("250px")}
                height={rem("50px")}
                fit="cover"
                mb={rem("50px")}
              />
            </Box>
          </Flex>
          <Flex w="100%" h="100%" className={classes["container-content"]}>
            <ScrollArea.Autosize w="100%" h="100%">
              <Flex direction="column" align="center" mt={60} p="lg">
                {children}
              </Flex>
            </ScrollArea.Autosize>
          </Flex>
          <Flex
            className={classes["container-footer"]}
            justify="space-between"
            align="center"
          >
            <Flex align="center" gap="sm">
              <ActionIcon onClick={toggle}>
                {fullscreen ? <IconMaximizeOff /> : <IconMaximize />}
              </ActionIcon>
              <SwitchDarkMode size="md" />
              <SelectLanguage />
            </Flex>
            <Flex gap="sm">
              {customFooter ? customFooter : null}
              <Button variant="outline" onClick={onCancel} disabled={loading}>
                {cancelText}
              </Button>
              {type !== "view" ? (
                <Button onClick={onSubmit} loading={loading}>
                  {submitText}
                </Button>
              ) : null}
            </Flex>
          </Flex>
        </Box>
      )}
    </Transition>
  );
};

export default PageDialog;

import { Box, Flex, Image, rem, Text, Title } from "@mantine/core";
import Logo from "@/assets/images/logo.png";
import LogoWhite from "@/assets/images/logo-white.png";
import { useStylesServerDown } from "./styles";
import SwitchDarkMode from "@/components/switch/darkmode";
import { ReactComponent as ServerDownImage } from "@/assets/svg/server-down.svg";

// TODO: useTranslation

const ServerDown = () => {
  const { classes, theme } = useStylesServerDown();
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
      <Flex direction="column" justify="center" align="center">
        <ServerDownImage width={400} height={250} />
        <Title my="md" size="26px">
          Our Server is Feelling a Little Down
        </Title>
        <Text italic>Please try again in a few moments.</Text>
        <Text italic>We'll be back up in no time</Text>
      </Flex>
      <Flex mt="xl">
        <Text size="xs" italic>{`Version ${APP_VERSION}`}</Text>
      </Flex>
      <Box className={classes["container-darkmode"]}>
        <SwitchDarkMode />
      </Box>
    </Flex>
  );
};

export default ServerDown;

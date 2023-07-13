import { Flex, Image, Loader, rem, Text } from "@mantine/core";
import { useStylesLazy } from "./styles";
import Logo from "@/assets/images/logo.png";
import LogoWhite from "@/assets/images/logo-white.png";

const LoaderLazy = ({ message }: { message?: string }) => {
  const { classes, theme } = useStylesLazy();
  return (
    <Flex justify="center" align="center" className={classes.container}>
      <Flex direction="column" align="center" gap={20}>
        <Image
          src={theme.colorScheme === "dark" ? LogoWhite : Logo}
          width={rem("250px")}
          height={rem("50px")}
          fit="cover"
        />
        <Loader />
        {message ? <Text size="sm">{message}</Text> : null}
        <Text size="xs" italic>
          {`Version ${APP_VERSION}`}
        </Text>
      </Flex>
    </Flex>
  );
};

export default LoaderLazy;

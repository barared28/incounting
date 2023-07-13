import { Switch, useMantineTheme, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

interface IProps {
  size?: string;
}

const SwitchDarkMode = ({ size = "xl" }: IProps) => {
  const theme = useMantineTheme();
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Switch
      size={size}
      onLabel={
        <IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />
      }
      offLabel={
        <IconMoonStars size="1rem" stroke={2.5} color={theme.colors.blue[6]} />
      }
      onChange={() => toggleColorScheme()}
      checked={colorScheme === "light"}
    />
  );
};

export default SwitchDarkMode;

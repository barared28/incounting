import {
  MantineProvider as MantineProviderRaw,
  ColorScheme,
  ColorSchemeProvider,
  rem,
} from "@mantine/core";
import { useLocalStorage, useColorScheme } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";

interface Props {
  children: JSX.Element;
}

const MantineProvider = ({ children }: Props) => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <Notifications position="top-right" w={rem("300px")} limit={5} />
      <MantineProviderRaw
        withGlobalStyles
        withNormalizeCSS
        theme={{
          globalStyles: (theme) => ({
            body: {
              backgroundColor:
                theme.colorScheme === "light"
                  ? theme.colors.lightback[0]
                  : theme.colors.dark[4],
            },
          }),
          colors: {
            lightback: ["#f4f6f9"],
            primary: ["#6777ef"],
          },
          colorScheme,
        }}
      >
        {children}
      </MantineProviderRaw>
    </ColorSchemeProvider>
  );
};

export default MantineProvider;

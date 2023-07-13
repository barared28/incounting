import { createStyles, rem } from "@mantine/core";

export const useStylesLayout = createStyles((theme) => ({
  container: {
    minWidth: "100vw",
    minHeight: "100vh",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.blue[6],
    overflowX: "hidden",
  },
  content: {
    width: "100%",
    minHeight: "90vh",
    borderRadius: "30px",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.lightback,
    margin: rem("20px"),
    padding: "0 22px",
    marginLeft: 0,
  },
}));

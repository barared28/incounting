import { createStyles, em } from "@mantine/core";

export const useStylesLogin = createStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
  },
  card: {
    minWidth: em("400px"),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.md,
  },
  "container-darkmode": {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
}));

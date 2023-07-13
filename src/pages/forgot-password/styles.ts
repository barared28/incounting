import { createStyles, em } from "@mantine/core";

export const useStylesForgot = createStyles((theme) => ({
  "dark-mode": {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
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
}));

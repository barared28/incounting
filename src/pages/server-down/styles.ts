import { createStyles } from "@mantine/core";

export const useStylesServerDown = createStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
  },
  "container-darkmode": {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
}));

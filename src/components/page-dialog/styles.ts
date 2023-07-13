import { createStyles } from "@mantine/core";

export const useStylesPageDialog = createStyles((theme) => ({
  container: {
    zIndex: 10,
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.blue[6],
    padding: "24px",
    display: "flex",
    flexDirection: "column",
  },
  "container-header": {
    height: "80px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
    borderRadius: "30px 30px 0 0",
    padding: "20px",
    boxShadow: theme.shadows.md,
  },
  "container-logo": {
    position: "absolute",
    bottom: "-40px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
    height: "75px",
    padding: "5px 20px",
    borderRadius: "0 0 20px 20px",
    zIndex: 12,
    boxShadow: theme.shadows.sm,
  },
  "container-content": {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.lightback[0],
    overflow: "hidden",
    zIndex: 10,
  },
  "container-footer": {
    height: "80px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
    width: "100%",
    borderRadius: "0 0 30px 30px",
    padding: "20px",
  },
}));

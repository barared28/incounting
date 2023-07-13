import { createStyles, rem } from "@mantine/core";

export const useStylesSidebar = createStyles(
  (theme, { expanded }: { expanded: boolean }) => ({
    container: {
      width: expanded ? "240px" : "100px",
      minWidth: expanded ? "240px" : "100px",
      paddingTop: rem("20px"),
      height: "100vh",
      position: "relative",
    },
    logo: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.lightback[0],
      marginRight: expanded ? "30px" : "20px",
      padding: expanded ? "20px" : "10px",
      borderRadius: "0 30px 30px 0",
    },
    business: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      borderTop: `solid 1px ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.blue[7]
      }`,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.blue[6],
      color: theme.colorScheme === "light" ? "white" : "",
      zIndex: 1,
    },
  })
);

export const useStylesMenu = createStyles(
  (
    theme,
    { selected, expanded }: { selected: boolean; expanded: boolean }
  ) => ({
    container: {
      width: "100%",
      height: "100%",
      minHeight: rem("57px"),
      paddingLeft: rem("15px"),
      position: "relative",
    },
    card: {
      backgroundColor: selected
        ? theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.lightback[0]
        : "",
      borderRadius: expanded ? "30px 0 0 30px" : "40px 0 0 40px",
      width: "100%",
      height: "100%",
      minHeight: rem("57px"),
      padding: `0 ${rem("20px")}`,
      color: theme.colorScheme === "light" && !selected ? "white" : "",
      cursor: selected ? "unset" : "pointer",
      ":hover": selected
        ? {}
        : {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.blue[5],
          },
    },
    "top-border": {
      position: "absolute",
      top: rem("-33px"),
      right: rem("3px"),
      fill:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.lightback[0],
      transform: "rotate(90deg)",
    },
    "bottom-border": {
      position: "absolute",
      bottom: rem("-36px"),
      right: 0,
      fill:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.lightback[0],
      zIndex: 1,
    },
    "image-border": {
      width: "30px",
      height: "30px",
    },
    "container-sub": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.blue[7],
      marginLeft: expanded ? rem("15px") : rem("10px"),
      marginRight: expanded ? rem("15px") : rem("10px"),
      borderRadius: expanded ? rem("30px") : rem("20px"),
      overflow: "hidden",
    },
    "sub-menu": {
      padding: rem("20px"),
      width: "100%",
      height: "100%",
      cursor: "pointer",
      ":hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.blue[5],
      },
    },
  })
);

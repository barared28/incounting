import { createStyles, rem } from "@mantine/core";

export const useStylesTableStyled = createStyles((theme) => ({
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: `0 ${rem("16px")}`,
  },
  thead: {},
  "tr-head": {
    padding: `${rem("4px")} ${rem("20px")}`,
    textAlign: "left",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontWeight: 600,
  },
  "th-head": {
    padding: `0 ${rem("20px")}`,
  },
  tbody: {},
  "tr-body": {},
  "td-body": {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
    padding: `${rem("10px")} ${rem("20px")}`,
    height: rem("72px"),
    ":first-child": {
      borderTopLeftRadius: rem("8px"),
      borderBottomLeftRadius: rem("8px"),
    },
    ":last-child": {
      borderTopRightRadius: rem("8px"),
      borderBottomRightRadius: rem("8px"),
    },
  },
}));

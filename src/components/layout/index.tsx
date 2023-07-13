import { Suspense } from "react";
import SideBar from "@/components/layout/sidebar";
import {
  Box,
  Divider,
  Flex,
  LoadingOverlay,
  rem,
  ScrollArea,
} from "@mantine/core";
import { useStylesLayout } from "./styles";
import { IMenusMain } from "@/config/menu";
import SimpleLoader from "../loader/simple";
import { useCustomLayout, useRedirectOldVersion } from "./hooks";
import MenuLayout from "./menu";
import { caculateVwPx } from "@/utils/styles";

interface ILayoutProps {
  children?: any;
  title?: string;
  isTranslated?: boolean;
  menus: IMenusMain[];
}

const Layout = (props: ILayoutProps) => {
  const { children, title, isTranslated = false, menus } = props;
  const { classes, theme } = useStylesLayout();
  const { expanded } = useCustomLayout({ title, isTranslated, menus });
  const { handleRedirect, loading } = useRedirectOldVersion();
  return (
    <Flex className={classes.container}>
      <LoadingOverlay visible={loading} />
      <SideBar
        data={menus}
        expanded={expanded}
        handleRedirect={handleRedirect}
      />
      <ScrollArea h="100vh" w="100vw" type="scroll" pr={rem("20px")}>
        <Flex direction="column" className={classes.content}>
          <MenuLayout />
          <Divider
            color={
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.dark[0]
            }
          />
          <Box
            sx={{
              position: "relative",
              padding: `${rem("25px")} 0`,
              minHeight: "88vh",
              maxWidth: expanded
                ? `${caculateVwPx(310)}px`
                : `${caculateVwPx(100)}px`,
            }}
          >
            <Suspense
              fallback={
                <Flex justify="center" align="center" h="80vh">
                  <SimpleLoader />
                </Flex>
              }
            >
              {children}
            </Suspense>
          </Box>
        </Flex>
      </ScrollArea>
    </Flex>
  );
};

export default Layout;

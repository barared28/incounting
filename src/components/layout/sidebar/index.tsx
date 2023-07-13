import {
  Box,
  Divider,
  Flex,
  Image,
  rem,
  ScrollArea,
  Text,
  Tooltip,
} from "@mantine/core";
import { useStylesSidebar } from "./styles";
import Logo from "@/assets/images/logo.png";
import LogoWhite from "@/assets/images/logo-white.png";
import { ReactComponent as LogoLite } from "@/assets/svg/logo_incounting_lite.svg";
import { IconBuildingStore } from "@tabler/icons-react";
import MenuSidebar from "./menu";
import { IMenusMain } from "@/config/menu";
import useBusiness from "@/store/useBusiness";

interface PropTypes {
  data: IMenusMain[];
  expanded: boolean;
  handleRedirect: any;
}

const SideBar = (props: PropTypes) => {
  const { data, expanded = true, handleRedirect } = props;
  const { theme, classes } = useStylesSidebar({ expanded });
  const { business } = useBusiness();

  return (
    <Flex
      direction="column"
      justify="space-between"
      className={classes.container}
    >
      <Box>
        <Flex align="center" justify="center" className={classes.logo} mb="xl">
          {expanded ? (
            <Image
              src={theme.colorScheme === "dark" ? LogoWhite : Logo}
              width={rem("160px")}
              height={rem("38px")}
              fit="cover"
            />
          ) : (
            <LogoLite width={rem("50px")} height={rem("46px")} />
          )}
        </Flex>
        <ScrollArea h="85vh" type="never">
          <Flex
            direction="column"
            pb={rem("70px")}
            justify={expanded ? "start" : "center"}
          >
            {data?.map((val, index) => (
              <>
                <Flex
                  px="15px"
                  align="center"
                  my="6px"
                  gap="sm"
                  justify={expanded ? "start" : "center"}
                >
                  {expanded ? (
                    <Text color="white" size="sm" italic weight={500}>
                      {val.name}
                    </Text>
                  ) : (
                    <Divider
                      w={index === 0 ? "0" : "50%"}
                      color={
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[3]
                          : theme.colors.blue[4]
                      }
                    />
                  )}
                </Flex>
                {val.menus.map((it) => (
                  <MenuSidebar
                    label={it.name}
                    logo={it.Icon}
                    subs={it.subs}
                    keyData={it.key}
                    expanded={expanded}
                    handleRedirect={handleRedirect}
                  />
                ))}
              </>
            ))}
          </Flex>
        </ScrollArea>
      </Box>
      <Flex
        px="md"
        py="xs"
        gap="xs"
        align="center"
        className={classes.business}
        justify={expanded ? "flex-start" : "center"}
      >
        {expanded ? (
          <IconBuildingStore />
        ) : (
          <Tooltip
            label={`${business?.name || ""} | ${business?.platform_type || ""}`}
          >
            <IconBuildingStore />
          </Tooltip>
        )}
        {expanded ? (
          <Box>
            <Text size="xs" weight={500}>
              {business?.name || ""}
            </Text>
            <Text size="xs" weight={300}>
              {business?.platform_type || ""}
            </Text>
          </Box>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default SideBar;

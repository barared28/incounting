import { useEffect, useMemo, useState } from "react";
import {
  ActionIcon,
  Box,
  Collapse,
  Flex,
  Text,
  Tooltip,
  rem,
} from "@mantine/core";
import { ReactComponent as BottomBorder } from "@/assets/svg/bottom-border.svg";
import { ReactComponent as TopBorder } from "@/assets/svg/up-border.svg";
import { IMenuSidebar } from "../types";
import { useStylesMenu } from "./styles";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { IMenusSubs } from "@/config/menu";
import { useNavigate, useLocation } from "react-router-dom";

interface IProps extends IMenuSidebar {
  selected?: boolean;
  subs: IMenusSubs[];
  keyData: string;
  expanded: boolean;
  handleRedirect: any;
}

const MenuSidebar = (props: IProps) => {
  const {
    label,
    expanded = true,
    logo,
    subs = [],
    keyData,
    handleRedirect,
  } = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const locPath = location?.pathname;
  const selected = useMemo(
    () => subs?.map((val) => val.path)?.includes(locPath),
    [subs, locPath]
  );
  const { classes, theme } = useStylesMenu({ selected, expanded });
  const isSubs = subs?.length > 0 && !subs[0]?.main;
  useEffect(() => {
    setOpen(!!selected);
  }, [selected]);
  const handleClickSubs = (subs: IMenusSubs) => {
    if (subs?.development) {
      handleRedirect({
        path: subs?.path,
      });
    } else {
      navigate(subs.path);
    }
  };
  return (
    <>
      <Box className={classes.container}>
        <Flex
          justify="space-between"
          align="center"
          className={classes.card}
          onClick={() => (isSubs ? setOpen(!open) : handleClickSubs(subs[0]))}
          data-cy={`menu-parent-${keyData}`}
        >
          <Flex align="center" gap="xs">
            {expanded ? (
              logo
            ) : (
              <Tooltip label={label} withinPortal position="right">
                {logo}
              </Tooltip>
            )}
            {expanded ? (
              <Text weight={500} size={14}>
                {label}
              </Text>
            ) : null}
          </Flex>
          {expanded ? (
            <Flex>
              {isSubs ? (
                <ActionIcon
                  variant="transparent"
                  onClick={() => setOpen(!open)}
                >
                  {open ? (
                    <IconChevronUp
                      size={rem("16px")}
                      color={
                        theme.colorScheme === "light"
                          ? selected
                            ? "black"
                            : "white"
                          : theme.colors.dark[0]
                      }
                    />
                  ) : (
                    <IconChevronDown
                      size={rem("16px")}
                      color={
                        theme.colorScheme === "light"
                          ? selected
                            ? "black"
                            : "white"
                          : theme.colors.dark[0]
                      }
                    />
                  )}
                </ActionIcon>
              ) : null}
            </Flex>
          ) : null}
          {selected && expanded ? (
            <>
              <Box className={classes["top-border"]}>
                <TopBorder className={classes["image-border"]} />
              </Box>
              <Box className={classes["bottom-border"]}>
                <BottomBorder className={classes["image-border"]} />
              </Box>
            </>
          ) : null}
        </Flex>
      </Box>
      {isSubs ? (
        <Collapse in={open} animateOpacity>
          <Flex
            direction="column"
            my={expanded ? 4 : 12}
            className={classes["container-sub"]}
          >
            {subs.map((val) => (
              <Flex
                className={classes["sub-menu"]}
                align="center"
                gap="xs"
                onClick={() => handleClickSubs(val)}
                sx={{
                  color: locPath === val.path ? "white" : theme.colors.gray[3],
                  ":hover": {
                    color: "white",
                  },
                }}
                data-cy={`menu-subs-${val?.key}`}
                justify={expanded ? "flex-start" : "center"}
              >
                {expanded ? (
                  val?.Icon
                ) : (
                  <Tooltip label={val?.name} withinPortal position="right">
                    {val?.Icon}
                  </Tooltip>
                )}
                {expanded ? <Text size={14}>{val?.name}</Text> : null}
              </Flex>
            ))}
          </Flex>
        </Collapse>
      ) : null}
    </>
  );
};

export default MenuSidebar;

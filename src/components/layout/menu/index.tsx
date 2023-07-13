import SelectLanguage from "@/components/select/lang";
import SwitchDarkMode from "@/components/switch/darkmode";
import useAuthHooks from "@/hooks/useAuth";
import useBreadcrumb from "@/store/useBreadcrumb";
import useSidebar from "@/store/useSidebar";
import useUser from "@/store/useUser";
import { convertInitial } from "@/utils";
import {
  ActionIcon,
  Anchor,
  Box,
  Breadcrumbs,
  Flex,
  rem,
  Menu,
  Avatar,
  Text,
  Divider,
} from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import {
  IconLayoutSidebarLeftExpand,
  IconMaximizeOff,
} from "@tabler/icons-react";
import { IconLayoutSidebarLeftCollapse } from "@tabler/icons-react";
import {
  IconBuildingStore,
  IconLogout,
  IconMaximize,
} from "@tabler/icons-react";
import {
  IconAddressBook,
  IconChevronRight,
  IconClipboardList,
  IconUserCircle,
} from "@tabler/icons-react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const MenuLayout = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { logout } = useAuthHooks();
  const queryClient = useQueryClient();
  const { breadcrumb } = useBreadcrumb();
  const { toggle, fullscreen } = useFullscreen();
  const { expanded, toggleExpanded } = useSidebar();
  return (
    <Box h={rem("70px")} w="100%">
      <Flex align="center" justify="space-between" h="100%">
        <Flex align="center" gap="sm">
          <ActionIcon onClick={toggleExpanded}>
            {expanded ? (
              <IconLayoutSidebarLeftCollapse />
            ) : (
              <IconLayoutSidebarLeftExpand />
            )}
          </ActionIcon>
          <Divider orientation="vertical" />
          <Breadcrumbs separator={<IconChevronRight size="12px" />}>
            {breadcrumb?.map((val) => (
              <Anchor key={val.label} size="sm">
                {val?.label}
              </Anchor>
            ))}
          </Breadcrumbs>
        </Flex>
        <Flex gap="md" align="center">
          <ActionIcon onClick={toggle}>
            {fullscreen ? <IconMaximizeOff /> : <IconMaximize />}
          </ActionIcon>
          <SwitchDarkMode size="md" />
          <SelectLanguage />
          <Menu position="bottom-end" withArrow offset={12}>
            <Menu.Target data-cy="menu-user">
              <Flex gap="xs" align="center">
                <Box>
                  <ActionIcon>
                    {user?.avatar ? (
                      <Avatar color="blue" radius="xl" src={user?.avatar} />
                    ) : (
                      <Avatar color="blue" radius="xl" variant="filled">
                        {user?.name ? convertInitial(user?.name) : ""}
                      </Avatar>
                    )}
                  </ActionIcon>
                </Box>
                <Box>
                  <Text size={11} weight={500}>
                    {user?.name}
                  </Text>
                  <Text size={11} italic>
                    {user?.email}
                  </Text>
                </Box>
              </Flex>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Profile</Menu.Label>
              <Menu.Item icon={<IconUserCircle size={rem("18px")} />} disabled>
                Edit Profile
              </Menu.Item>
              <Menu.Item icon={<IconAddressBook size={rem("18px")} />} disabled>
                Contact
              </Menu.Item>
              <Menu.Label>Feature</Menu.Label>
              <Menu.Item
                icon={<IconClipboardList size={rem("18px")} />}
                disabled
              >
                Product
              </Menu.Item>
              <Menu.Label>Auth</Menu.Label>
              <Menu.Item
                icon={<IconBuildingStore size={rem("18px")} />}
                onClick={() => navigate("/select-business")}
                data-cy="change-business"
              >
                Change Business
              </Menu.Item>
              <Menu.Item
                icon={<IconLogout size={rem("18px")} />}
                color="red"
                onClick={() => {
                  logout();
                  queryClient.invalidateQueries("user");
                }}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MenuLayout;

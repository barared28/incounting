import { useEffect } from "react";
import {
  Flex,
  Text,
  Image,
  rem,
  Box,
  Card,
  Group,
  ActionIcon,
  Title,
  Tooltip,
  Button,
  ScrollArea,
  Transition,
} from "@mantine/core";
import Logo from "@/assets/images/logo.png";
import LogoWhite from "@/assets/images/logo-white.png";
import SwitchDarkMode from "@/components/switch/darkmode";
import { useStylesBusiness } from "./styles";
import { useCustomBusiness, useOptionBusiness } from "./hooks";
import {
  IconBuildingStore,
  IconCirclePlus,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
import useAuthHooks from "@/hooks/useAuth";
import TableBusiness from "./components/table";
import useUser from "@/store/useUser";
import usePagination from "@/hooks/usePagination";
import { useNavigate } from "react-router-dom";
import { IconArrowBackUp } from "@tabler/icons-react";
import moment from "moment";

const Business = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { logout } = useAuthHooks();
  const { classes, theme } = useStylesBusiness();
  const { mounted, logined, business } = useCustomBusiness();
  const { limit, page, onChangePagination } = usePagination({ limit: 5 });
  const { isLoading, data, refetch, isRefetching } = useOptionBusiness({
    limit,
    page,
  });

  useEffect(() => {
    refetch();
  }, [limit, page]);

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      className={classes.container}
    >
      <Box>
        <Image
          src={theme.colorScheme === "dark" ? LogoWhite : Logo}
          width={rem("250px")}
          height={rem("50px")}
          fit="cover"
          mb={rem("50px")}
        />
      </Box>
      <Transition mounted={mounted} transition="pop">
        {(styles) => (
          <Card style={styles} shadow="xl" miw={500}>
            <Card.Section inheritPadding p={rem("15px")} withBorder={!logined}>
              <Group position="apart">
                <Title size={16}>
                  {logined ? "Change Business" : "Choose Business"}
                </Title>
                <Tooltip label="Logout" position="left">
                  <ActionIcon
                    variant="transparent"
                    color="red"
                    onClick={logout}
                  >
                    <IconLogout size={rem("18px")} color="red" />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Card.Section>
            {logined ? (
              <Card.Section p={rem("15px")} withBorder>
                <Flex gap="sm" align="center">
                  {/* TODO: use useTranslation */}
                  <Tooltip label="back using selected business">
                    <ActionIcon onClick={() => navigate("/dashboard")}>
                      <IconArrowBackUp size={36} />
                    </ActionIcon>
                  </Tooltip>
                  <Flex gap="sm" align="center">
                    <IconBuildingStore />
                    <Box>
                      <Text size="sm" weight={500}>
                        {business?.name}
                      </Text>
                      <Flex gap={6}>
                        <Text size={11}>
                          {`Type: ${business?.type?.en_title || "-"}`}
                        </Text>
                        <Text size={11}>|</Text>
                        <Text size={11}>
                          {`Category: ${business?.type?.category || "-"}`}
                        </Text>
                        <Text size={11}>|</Text>
                        <Text size={11}>
                          {`Created At: ${
                            business?.created_at
                              ? moment(business.created_at).format(
                                  "DD MMM YYYY"
                                )
                              : "-"
                          }`}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>
              </Card.Section>
            ) : null}
            <Card.Section inheritPadding p={rem("15px")}>
              <Flex justify="space-between" mb="xs" align="center">
                <Flex align="center" gap="xs">
                  <IconUserCircle />
                  <Box>
                    <Text size="sm" weight={500}>
                      {user?.name}
                    </Text>
                    <Text size={10} italic>
                      {user?.email}
                    </Text>
                  </Box>
                </Flex>
                <Button
                  size="xs"
                  variant="gradient"
                  leftIcon={<IconCirclePlus size={18} />}
                >
                  Create Business
                </Button>
              </Flex>
              <ScrollArea.Autosize mah="50vh" type="never">
                <TableBusiness
                  data={data}
                  page={page}
                  limit={limit}
                  onChangePagination={onChangePagination}
                  loading={isLoading}
                  isRefetching={isRefetching}
                  selectedId={logined ? business?.id : 0}
                />
              </ScrollArea.Autosize>
            </Card.Section>
          </Card>
        )}
      </Transition>
      <Flex mt="xl">
        <Text size="xs" italic>{`Version ${APP_VERSION}`}</Text>
      </Flex>
      <Box className={classes["container-darkmode"]}>
        <SwitchDarkMode />
      </Box>
    </Flex>
  );
};

export default Business;

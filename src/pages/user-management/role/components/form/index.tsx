import PageDialog from "@/components/page-dialog";
import {
  Accordion,
  Badge,
  Box,
  Checkbox,
  Flex,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import RoleData from "@/config/role";
import useFormRole from "../../hooks/use-form";
import useSaveRole from "../../hooks/use-save";
import { TPageDialogType } from "@/types";

interface IProps {
  opened: boolean;
  onClose: () => void;
  data: any;
  type: TPageDialogType;
}

const FormRole = (props: IProps) => {
  const { onClose, opened, data, type } = props;
  const {
    form,
    findValue,
    handleChangeGroup,
    handleChangeMenu,
    handleChangeAction,
    countActiveAction,
    countActiveMenu,
    handleCloseForm,
  } = useFormRole(data || []);
  const { handleSave, loading } = useSaveRole();
  const handleClose = () => {
    handleCloseForm();
    onClose();
  };
  const handleSubmit = (val: any) => {
    handleSave({
      payload: val,
      type,
      id: data?.id || "",
      callback: handleClose,
    });
  };
  return (
    <PageDialog
      show={opened}
      title="Create Role"
      onSubmit={form.onSubmit(handleSubmit)}
      loading={loading}
      onCancel={handleClose}
    >
      <Flex direction="column" w="100%" gap="lg" maw={800}>
        <TextInput
          label="Name"
          withAsterisk
          placeholder="Name"
          maw={400}
          {...form.getInputProps("name")}
        />
        <Box>
          <Text size="sm" weight={500} mb="sm">
            List Permission
          </Text>
          <Flex direction="column" gap="md">
            {RoleData.map((val) => (
              <Paper px="sm" py="lg">
                <Text mb="sm" italic>
                  {val.group.label}
                </Text>
                <Flex direction="column" gap="sm">
                  {val.group.parent?.map((parent) => (
                    <Accordion variant="contained">
                      <Accordion.Item value={parent.key}>
                        <Accordion.Control>
                          <Flex align="center" gap="md">
                            <Checkbox
                              checked={findValue("group", parent.key)}
                              onChange={(val) =>
                                handleChangeGroup(
                                  parent.key,
                                  val.currentTarget.checked
                                )
                              }
                            />
                            {parent.Icon}
                            <Text size="sm" weight={500}>
                              {parent.label}
                            </Text>
                            {countActiveMenu(parent.key) > 0 && (
                              <Badge size="sm" color="blue">{`${countActiveMenu(
                                parent.key
                              )} Menu`}</Badge>
                            )}
                          </Flex>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Flex direction="column" gap="xs">
                            {parent.menu?.map((menu) => (
                              <Accordion variant="separated">
                                <Accordion.Item value={menu.key}>
                                  <Accordion.Control>
                                    <Flex align="center" gap="md">
                                      <Checkbox
                                        checked={findValue(
                                          "menu",
                                          parent.key,
                                          menu.key
                                        )}
                                        onChange={(val) =>
                                          handleChangeMenu(
                                            parent.key,
                                            menu.key,
                                            val.currentTarget.checked
                                          )
                                        }
                                      />
                                      {menu.Icon}
                                      <Text size="sm">{menu.label}</Text>
                                      {countActiveAction(parent.key, menu.key) >
                                        0 && (
                                        <Badge
                                          size="sm"
                                          color="green"
                                        >{`${countActiveAction(
                                          parent.key,
                                          menu.key
                                        )} Permission`}</Badge>
                                      )}
                                    </Flex>
                                  </Accordion.Control>
                                  <Accordion.Panel>
                                    <Flex gap="md" wrap="wrap" px="lg">
                                      {menu.actions?.map((action) => (
                                        <Checkbox
                                          label={action.label}
                                          value={action.value}
                                          checked={findValue(
                                            "action",
                                            parent.key,
                                            menu.key,
                                            action.value
                                          )}
                                          onChange={(val) =>
                                            handleChangeAction(
                                              parent.key,
                                              menu.key,
                                              action.value,
                                              val.currentTarget.checked
                                            )
                                          }
                                          disabled={
                                            action.value === "view" &&
                                            findValue(
                                              "action",
                                              parent.key,
                                              menu.key,
                                              action.value
                                            ) &&
                                            countActiveAction(
                                              parent.key,
                                              menu.key
                                            ) > 1
                                          }
                                        />
                                      ))}
                                    </Flex>
                                  </Accordion.Panel>
                                </Accordion.Item>
                              </Accordion>
                            ))}
                          </Flex>
                        </Accordion.Panel>
                      </Accordion.Item>
                    </Accordion>
                  ))}
                </Flex>
              </Paper>
            ))}
          </Flex>
        </Box>
      </Flex>
    </PageDialog>
  );
};

export default FormRole;

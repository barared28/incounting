import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  FileInput,
  Flex,
  Image,
  NumberInput,
  Paper,
  Tabs,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { IconBuildingStore, IconUpload, IconWorld } from "@tabler/icons-react";
import useDataBussinessSetting from "./hooks/use-data";
import useFormBusinessSetting from "./hooks/use-form";
import SelectBusinessType from "@/components/select/business-type";
import useUser from "@/store/useUser";
import useSaveBusinessSetting from "./hooks/use-save";

const Setting = () => {
  const { user } = useUser();
  const isAdmin = !!(user?.user_type === "Internal");
  const { data } = useDataBussinessSetting();
  const form = useFormBusinessSetting(data);
  const { handleSave, loading } = useSaveBusinessSetting();
  return (
    <Box>
      <Paper>
        <Box px="sm" py="md">
          <Title size={18}>Setting</Title>
        </Box>
        <Divider />
        <Box px="xs" py="md">
          <Tabs variant="outline" radius="lg" defaultValue="company">
            <Tabs.List>
              <Tabs.Tab value="company" icon={<IconBuildingStore />}>
                Company
              </Tabs.Tab>
              <Tabs.Tab value="bank" disabled>
                Bank
              </Tabs.Tab>
              <Tabs.Tab value="tax_service" disabled>
                Tax & Service
              </Tabs.Tab>
              <Tabs.Tab value="accounting" disabled>
                Accounting
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="company">
              <Flex justify="center">
                <Box p="md" w="100%" maw={800}>
                  <Box mb="sm">
                    <Center mb="sm">
                      <Image
                        width={200}
                        height={200}
                        src={data?.logo || null}
                        alt="With default placeholder"
                        withPlaceholder
                      />
                    </Center>
                    <FileInput
                      label="Logo"
                      accept="image/*"
                      icon={<IconUpload size={rem(14)} />}
                      {...form.getInputProps("image")}
                    />
                    <Checkbox
                      label="Show Logo to Report"
                      mt="sm"
                      {...form.getInputProps("show_logo_to_report")}
                    />
                  </Box>
                  <Flex justify="space-between" gap="md">
                    <SelectBusinessType
                      w="100%"
                      label="Business Type"
                      withAsterisk
                      disabled={!isAdmin}
                      selectedData={data?.type}
                      {...form.getInputProps("business_type_id")}
                    />
                    <TextInput
                      w="100%"
                      label="Company Name"
                      withAsterisk
                      {...form.getInputProps("name")}
                    />
                  </Flex>
                  <Flex justify="space-between" gap="md" mt="md">
                    <TextInput
                      w="100%"
                      label="Company Address"
                      {...form.getInputProps("address")}
                    />
                    <TextInput
                      w="100%"
                      label="Shipping Address"
                      {...form.getInputProps("shipping_address")}
                    />
                  </Flex>
                  <Flex justify="space-between" gap="md" mt="md">
                    <NumberInput
                      w="100%"
                      label="Cut of Date"
                      description="please input date (Month)"
                      min={1}
                      max={31}
                      {...form.getInputProps("cut_of_date")}
                    />
                    <NumberInput
                      w="100%"
                      label="Max Late Attendance"
                      description="please input minutes"
                      min={0}
                      max={60}
                      {...form.getInputProps("max_late_attendance")}
                    />
                  </Flex>
                  <Flex justify="space-between" gap="md" mt="md">
                    <TextInput
                      w="100%"
                      label="Phone"
                      {...form.getInputProps("phone")}
                    />
                    <TextInput
                      w="100%"
                      label="Fax"
                      {...form.getInputProps("fax")}
                    />
                  </Flex>
                  <Flex justify="space-between" gap="md" mt="md">
                    <TextInput
                      w="100%"
                      label="NPWP"
                      {...form.getInputProps("npwp")}
                    />
                    <TextInput
                      w="100%"
                      label="Email"
                      {...form.getInputProps("email")}
                    />
                  </Flex>
                  <TextInput
                    w="100%"
                    label="Website"
                    mt="md"
                    icon={<IconWorld size={rem(14)} />}
                    {...form.getInputProps("website")}
                  />
                  <Flex mt="lg" justify="end">
                    <Button
                      loading={loading}
                      onClick={() => form.onSubmit(handleSave)()}
                    >
                      Save
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Paper>
    </Box>
  );
};

export default Setting;

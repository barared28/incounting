import PageDialog from "@/components/page-dialog";
import useFormBookingSource from "../hooks/use-form";
import useSaveBookingSource from "../hooks/use-save";
import { Flex, Paper, Select, TextInput, Textarea } from "@mantine/core";
import { TPageDialogType } from "@/types";
import PercentageInput from "@/components/input/percent";
import RupiahInput from "@/components/input/rupiah";
import SelectAccountList from "@/components/select/account-list";

interface IProps {
  opened: boolean;
  onClose: () => void;
  data: any;
  type: TPageDialogType;
}

const FormBookingSource = (props: IProps) => {
  const { data, onClose, opened, type } = props;
  const form = useFormBookingSource(data);
  const { handleSave, loading } = useSaveBookingSource();

  const handleClose = () => {
    onClose();
    form.reset();
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
      title={`${type === "update" ? "Update" : "Create"} Booking Source`}
      show={opened}
      onCancel={handleClose}
      type={type}
      loading={loading}
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <Paper p="xl" w={620} radius="sm">
        <Flex direction="column" gap="md">
          <Flex gap="md">
            <TextInput
              label="Company Name"
              w="100%"
              withAsterisk
              {...form.getInputProps("company_name")}
            />
            <Select
              label="Type"
              w="100%"
              data={[
                { value: "1", label: "Online Travel Agent" },
                {
                  value: "2",
                  label: "Offline Travel Agent",
                },
                {
                  value: "3",
                  label: "Corporate",
                },
              ]}
              withAsterisk
              {...form.getInputProps("type")}
            />
          </Flex>
          <Flex gap="md">
            <TextInput
              label="Email"
              w="100%"
              withAsterisk
              {...form.getInputProps("email")}
            />
            <SelectAccountList
              w="100%"
              {...form.getInputProps("account_list_id")}
            />
          </Flex>
          <Flex gap="md">
            <TextInput
              label="PIC Name"
              w="100%"
              {...form.getInputProps("pic_name")}
            />
            <TextInput
              label="Bank Account"
              w="100%"
              {...form.getInputProps("bank_account")}
            />
          </Flex>
          <Flex gap="md">
            <TextInput
              label="Handphone"
              w="100%"
              {...form.getInputProps("handphone")}
            />
            <TextInput
              label="Phone Number"
              w="100%"
              {...form.getInputProps("phone")}
            />
          </Flex>
          <Flex gap="md">
            <TextInput label="Fax" w="100%" {...form.getInputProps("fax")} />
            <TextInput label="NPWP" w="100%" {...form.getInputProps("npwp")} />
          </Flex>
          <Flex gap="md">
            <Select
              label="Commision Type"
              w="30%"
              data={[
                { value: "0", label: "Percentage" },
                { value: "1", label: "Amount" },
              ]}
              withinPortal
              {...form.getInputProps("room_commission_type")}
            />
            {String(form.values.room_commission_type) === "0" ? (
              <PercentageInput
                label="Commission Rate"
                w="100%"
                {...form.getInputProps("room_commission")}
              />
            ) : (
              <RupiahInput
                label="Commission Rate"
                w="100%"
                {...form.getInputProps("room_commission")}
              />
            )}
          </Flex>
          {String(form.values.type) === "2" ? (
            <>
              <Textarea
                label="Address"
                withAsterisk
                {...form.getInputProps("offline_address")}
              />
              <Flex gap="md" wrap="wrap">
                <TextInput
                  withAsterisk
                  label="No"
                  placeholder="No"
                  w="100%"
                  maw={130}
                  {...form.getInputProps("offline_address_number")}
                />
                <TextInput
                  withAsterisk
                  label="RT"
                  placeholder="RT"
                  w="100%"
                  maw={130}
                  {...form.getInputProps("offline_address_rt")}
                />
                <TextInput
                  withAsterisk
                  label="RW"
                  placeholder="RW"
                  w="100%"
                  maw={130}
                  {...form.getInputProps("offline_address_rw")}
                />
                <TextInput
                  label="Postal Code"
                  placeholder="Postal Code"
                  w="100%"
                  withAsterisk
                  maw={130}
                  {...form.getInputProps("offline_address_postal_code")}
                />
              </Flex>
              <Flex gap="md" w="100%">
                <TextInput
                  label="Subdistrict"
                  placeholder="Subdistrict"
                  w="100%"
                  withAsterisk
                  {...form.getInputProps("offline_address_subdistrict")}
                />
                <TextInput
                  withAsterisk
                  label="District"
                  placeholder="District"
                  w="100%"
                  {...form.getInputProps("offline_address_district")}
                />
              </Flex>
              <Flex gap="md" w="100%">
                <TextInput
                  withAsterisk
                  label="City"
                  placeholder="City"
                  w="100%"
                  {...form.getInputProps("offline_address_city")}
                />
                <TextInput
                  withAsterisk
                  label="Province"
                  placeholder="Province"
                  w="100%"
                  {...form.getInputProps("offline_address_province")}
                />
              </Flex>
            </>
          ) : null}
        </Flex>
      </Paper>
    </PageDialog>
  );
};

export default FormBookingSource;

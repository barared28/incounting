import {
  Box,
  Checkbox,
  Flex,
  Paper,
  Select,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface IProps {
  form: UseFormReturnType<any>;
  disabled?: boolean;
}

const NameTypeOptions = [
  {
    label: "PT",
    value: "1",
  },
  {
    label: "CV",
    value: "2",
  },
  {
    label: "Mr",
    value: "3",
  },
  {
    label: "Mrs",
    value: "4",
  },
];

const IdentityTypeOptions = [
  {
    label: "KTP",
    value: "KTP",
  },
  {
    label: "SIM",
    value: "SIM",
  },
  {
    label: "Passport",
    value: "Passport",
  },
];

const GeneralSection = (props: IProps) => {
  const { form, disabled } = props;
  return (
    <Paper p="xl" w="100%" radius="sm">
      <Flex direction="column" gap="sm">
        <Text weight={500}>General Info</Text>
        <Box>
          <Text size="sm" weight={500}>
            Name
          </Text>
          <Flex gap="md" w="100%">
            <Select
              data={NameTypeOptions}
              w="40%"
              disabled={disabled}
              {...form.getInputProps("name_type")}
            />
            <TextInput
              placeholder="First Name"
              w="100%"
              disabled={disabled}
              {...form.getInputProps("first_name")}
            />
            <TextInput
              placeholder="Last Name"
              w="100%"
              disabled={disabled}
              {...form.getInputProps("last_name")}
            />
          </Flex>
        </Box>
        <TextInput
          label="Handphone"
          disabled={disabled}
          withAsterisk
          {...form.getInputProps("handphone")}
        />
        <Box>
          <Flex gap="md" w="100%" align="end">
            <Select
              data={IdentityTypeOptions}
              w="30%"
              disabled={disabled}
              withAsterisk
              label="Identity"
              {...form.getInputProps("identity_type")}
            />
            <TextInput
              placeholder="Identity Number"
              w="100%"
              disabled={disabled}
              {...form.getInputProps("identity_number")}
            />
          </Flex>
        </Box>
        <TextInput
          label="Email"
          disabled={disabled}
          {...form.getInputProps("email")}
        />
        <Textarea
          label="Other Info"
          disabled={disabled}
          {...form.getInputProps("other")}
        />
        <TextInput
          label="Company Name"
          disabled={disabled}
          {...form.getInputProps("company_name")}
        />
        <TextInput
          label="Phone Number"
          disabled={disabled}
          {...form.getInputProps("phone_number")}
        />
        <TextInput
          label="Fax Number"
          disabled={disabled}
          {...form.getInputProps("fax_number")}
        />
        <TextInput
          label="NPWP"
          disabled={disabled}
          {...form.getInputProps("npwp")}
        />
        <Checkbox
          label="Add Detail Address"
          disabled={disabled}
          {...form.getInputProps("is_have_detail", { type: "checkbox" })}
        />
        <Textarea
          label="Payment Address"
          disabled={disabled}
          {...form.getInputProps("payment_address")}
        />
        {form.values?.is_have_detail ? (
          <>
            <Flex gap="md" wrap="wrap">
              <TextInput
                description="No"
                placeholder="No"
                w="100%"
                maw={130}
                disabled={disabled}
                {...form.getInputProps("payment_address_number")}
              />
              <TextInput
                description="RT"
                placeholder="RT"
                w="100%"
                maw={130}
                disabled={disabled}
                {...form.getInputProps("payment_address_rt")}
              />
              <TextInput
                description="RW"
                placeholder="RW"
                w="100%"
                maw={130}
                disabled={disabled}
                {...form.getInputProps("payment_address_rw")}
              />
              <TextInput
                description="Postal Code"
                placeholder="Postal Code"
                w="100%"
                maw={130}
                disabled={disabled}
                {...form.getInputProps("payment_address_portal_cc")}
              />
            </Flex>
            <Flex gap="md" w="100%">
              <TextInput
                description="Subdistrict"
                placeholder="Subdistrict"
                w="100%"
                disabled={disabled}
                {...form.getInputProps("payment_address_subdistrict")}
              />
              <TextInput
                description="District"
                placeholder="District"
                w="100%"
                disabled={disabled}
                {...form.getInputProps("payment_address_district")}
              />
            </Flex>
            <Flex gap="md" w="100%">
              <TextInput
                description="City"
                placeholder="City"
                w="100%"
                disabled={disabled}
                {...form.getInputProps("payment_address_city")}
              />
              <TextInput
                description="Province"
                placeholder="Province"
                w="100%"
                disabled={disabled}
                {...form.getInputProps("payment_address_province")}
              />
            </Flex>
          </>
        ) : null}
        <Checkbox
          label="Same as Payment Address"
          {...form.getInputProps("is_same_address", { type: "checkbox" })}
          disabled={disabled}
        />
        <Textarea
          label="Shipping Address"
          disabled={form.values?.is_same_address || disabled}
          {...form.getInputProps(
            form.values?.is_same_address
              ? "payment_address"
              : "shipping_address"
          )}
        />
      </Flex>
    </Paper>
  );
};

export default GeneralSection;

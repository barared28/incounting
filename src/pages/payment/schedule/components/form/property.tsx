import { useEffect, useState } from "react";
import SelectProperty from "@/components/select/property";
import {
  Divider,
  Flex,
  Paper,
  Table,
  Text,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useQuery } from "react-query";
import RupiahInput from "@/components/input/rupiah";

interface IProps {
  form: UseFormReturnType<any>;
}

const PropertyFormSection = (props: IProps) => {
  const { form } = props;
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const theme = useMantineTheme();
  const { data } = useQuery<any>(["property-option"]);

  useEffect(() => {
    if (!form.values?.product_id || !data?.data) return;
    const res = data?.data?.find(
      (val: any) => String(val?.id) === String(form.values?.product_id)
    );
    form.setFieldValue("price", res?.type?.price || 0);
    setSelectedProperty(res);
  }, [form.values?.product_id]);

  return (
    <Paper p="xl" w="100%" radius="sm">
      <Flex direction="column" gap="sm" maw={rem("620px")}>
        <Text weight={500}>Property Details</Text>
        <SelectProperty {...form.getInputProps("product_id")} />
      </Flex>
      {form.values?.product_id && selectedProperty ? (
        <>
          <Divider variant="dashed" my={40} />
          <Text size={14} weight={500} mb={16}>
            Property Detail
          </Text>
          <Table verticalSpacing="md">
            <thead>
              <tr style={{ backgroundColor: theme.colors.gray[3] }}>
                <th>Property Name</th>
                <th>Type</th>
                <th>Price (Rp)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedProperty?.name}</td>
                <td>{selectedProperty?.type?.name}</td>
                <td>
                  <RupiahInput {...form.getInputProps("price")} />
                </td>
              </tr>
            </tbody>
          </Table>
          <Divider variant="dashed" my={40} />
        </>
      ) : null}
    </Paper>
  );
};

export default PropertyFormSection;

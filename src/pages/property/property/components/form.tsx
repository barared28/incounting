import { Flex, Paper, TextInput } from "@mantine/core";
import { useFormProperty, useSaveProperty } from "../hooks";
import { TPageDialogType } from "@/types";
import SelectPropertyType from "@/components/select/property-type";
import PageDialog from "@/components/page-dialog";

interface IProps {
  opened: boolean;
  onClose: () => void;
  data: any;
  type: TPageDialogType;
}

const FormProperty = (props: IProps) => {
  const { onClose, opened, data, type } = props;
  const form = useFormProperty(data);
  const { handleSave, loading } = useSaveProperty();
  const handleClose = () => {
    form.reset();
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
      title="Create Property"
      show={opened}
      onCancel={handleClose}
      onSubmit={form.onSubmit(handleSubmit)}
      loading={loading}
      type={type}
    >
      <Paper p="xl" w={400} radius="sm">
        <Flex direction="column" gap="sm">
          <TextInput
            label="Name"
            withAsterisk
            placeholder="Name"
            data-cy="property-name"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Code"
            withAsterisk
            placeholder="CODE_001"
            data-cy="property-code"
            {...form.getInputProps("code")}
          />
          <SelectPropertyType
            data-cy="property-type"
            {...form.getInputProps("product_category_id")}
            withAsterisk
            selectedData={data?.type}
          />
        </Flex>
      </Paper>
    </PageDialog>
  );
};

export default FormProperty;

import { Flex, Paper, TextInput } from "@mantine/core";
import RupiahInput from "@/components/input/rupiah";
import { TPageDialogType } from "@/types";
import PageDialog from "@/components/page-dialog";
import useFormPropertyType from "../hooks/use-form";
import useSavePropertyType from "../hooks/use-save";

interface IProps {
  opened: boolean;
  onClose: () => void;
  data: any;
  type: TPageDialogType;
}

const FormPropertyType = (props: IProps) => {
  const { onClose, opened, data, type } = props;
  const form = useFormPropertyType(data);
  const { handleSave, loading } = useSavePropertyType();

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
      show={opened}
      // TODO - make universal with useTranslation
      title={`${type === "update" ? "Update" : "Create"} Property Type`}
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
          <RupiahInput
            label="Price"
            withAsterisk
            min={0}
            data-cy="property-price"
            {...form.getInputProps("price")}
          />
        </Flex>
      </Paper>
    </PageDialog>
  );
};

export default FormPropertyType;

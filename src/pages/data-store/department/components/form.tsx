import PageDialog from "@/components/page-dialog";
import { TPageDialogType } from "@/types";
import { Paper, TextInput } from "@mantine/core";
import useFormDepartment from "../hooks/use-form";
import useSaveDepartment from "../hooks/use-save";

interface IProps {
  opened: boolean;
  onClose: () => void;
  data: any;
  type: TPageDialogType;
}

const FormDepartment = (props: IProps) => {
  const { data, onClose, opened, type } = props;
  const form = useFormDepartment(data?.name || "");
  const { handleSave, loading } = useSaveDepartment();

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
      title={`${type === "update" ? "Update" : "Create"} Department`}
      show={opened}
      onCancel={handleClose}
      type={type}
      loading={loading}
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <Paper p="xl" w={400} radius="sm">
        <TextInput
          label="Name"
          withAsterisk
          placeholder="Name"
          {...form.getInputProps("name")}
        />
      </Paper>
    </PageDialog>
  );
};

export default FormDepartment;

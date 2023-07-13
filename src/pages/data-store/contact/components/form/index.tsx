import PageDialog from "@/components/page-dialog";
import { TPageDialogType } from "@/types";
import { Button, Flex, Loader, rem } from "@mantine/core";
import { useMemo } from "react";
import ContactSection from "./contact";
import GeneralSection from "./general";
import useFormContact from "../../hooks/use-form";
import useSaveContact from "../../hooks/use-save";
import { IconEdit } from "@tabler/icons-react";
import useDetails from "../../hooks/use-details";
import BankSection from "./bank";

interface IProps {
  opened: boolean;
  onClose: () => void;
  data: any;
  type: TPageDialogType;
  onEdit?: () => void;
}

const FormContact = (props: IProps) => {
  const { opened, onClose, data, type, onEdit } = props;
  const { isLoading: loadingDetails, data: dataDetails } = useDetails(
    data?.id || ""
  );
  const { form, handleAddBank, handleRemoveBank } = useFormContact(dataDetails);
  const { handleSave, loading } = useSaveContact();

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

  const title = useMemo(() => {
    switch (type) {
      case "create":
        return "Create Contact";
      case "update":
        return "Update Contact";
      case "view":
        return "Details Contact";
      default:
        return "Contact";
    }
  }, [type]);

  const disabled = useMemo(() => type === "view", [type]);

  return (
    <PageDialog
      show={opened}
      onCancel={handleClose}
      type={type}
      title={title}
      onSubmit={form.onSubmit((val) => handleSubmit(val))}
      loading={loading}
      customFooter={
        type === "view" ? (
          <Button leftIcon={<IconEdit size={18} />} onClick={onEdit}>
            Edit
          </Button>
        ) : undefined
      }
    >
      {loadingDetails ? (
        <Loader />
      ) : (
        <Flex direction="column" gap="sm" w="100%" maw={rem("620px")}>
          <ContactSection form={form} disabled={disabled} />
          <GeneralSection form={form} disabled={disabled} />
          <BankSection
            form={form}
            disabled={disabled}
            handleAddBank={handleAddBank}
            handleRemoveBank={handleRemoveBank}
            selectedData={dataDetails?.banks || []}
          />
        </Flex>
      )}
    </PageDialog>
  );
};

export default FormContact;

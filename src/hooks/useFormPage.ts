import { TPageDialogType } from "@/types";
import { useState } from "react";

const useFormPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<TPageDialogType>("create");
  const [selectedData, setSelectedData] = useState<any>({});
  const callForm = () => setShowForm(true);
  const hideForm = () => setShowForm(false);
  const handleClose = () => {
    setFormType("create");
    setSelectedData({});
    hideForm();
  };
  const handleEdit = (val: any) => {
    setFormType("update");
    setSelectedData(val);
    callForm();
  };
  return {
    showForm,
    setShowForm,
    formType,
    setFormType,
    selectedData,
    setSelectedData,
    handleClose,
    handleEdit,
    callForm,
    hideForm,
  };
};

export default useFormPage;

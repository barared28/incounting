import { useEffect } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const useFormDepartment = (name: string) => {
  const { t } = useTranslation();
  const schema = Yup.object({
    name: Yup.string().required(t("required", { key: "Name" }) || ""),
  });
  const form = useForm({
    initialValues: {
      name: name || "",
    },
    validate: yupResolver(schema),
  });

  useEffect(() => {
    if (name) {
      form.setFieldValue("name", name);
    }
  }, [name]);

  return form;
};

export default useFormDepartment;

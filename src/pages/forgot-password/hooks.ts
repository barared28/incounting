import { useForm, yupResolver } from "@mantine/form";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const useFormForgot = () => {
  const { t } = useTranslation();
  const schema = Yup.object({
    email: Yup.string()
      .required(t("required", { key: "Email" }) || "")
      .email(t("invalid", { key: "Email" }) || ""),
  });
  return useForm({
    initialValues: {
      email: "",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });
};

import { useForm, yupResolver } from "@mantine/form";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const useFormRegister = () => {
  const { t } = useTranslation();
  const schema = Yup.object({
    name: Yup.string().required(
      t("required", { key: t("register.name") }) || ""
    ),
    phone_number: Yup.number().required(
      t("required", { key: t("register.phone_number") }) || ""
    ),
    email: Yup.string()
      .required(t("required", { key: "Email" }) || "")
      .email(t("invalid", { key: "Email" }) || ""),
    password: Yup.string()
      .required(t("required", { key: t("register.password") }) || "")
      .min(6, t("min", { key: t("register.password"), val: 6 }) || ""),
    confirm_password: Yup.string()
      .required(t("required", { key: t("register.password") }) || "")
      .min(6, t("min", { key: t("register.password"), val: 6 }) || "")
      .oneOf(
        ["password"],
        t("not_same", { key: t("register.password") }) || ""
      ),
  });
  return useForm({
    initialValues: {
      name: "",
      phone_number: "",
      email: "",
      password: "",
      confirm_password: "",
    },

    validate: yupResolver(schema),
  });
};

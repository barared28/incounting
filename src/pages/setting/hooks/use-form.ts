import { useForm, yupResolver } from "@mantine/form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const useFormBusinessSetting = (props: any) => {
  const { t } = useTranslation();
  const schema = Yup.object({
    name: Yup.string().required(t("required", { key: "Name" }) || ""),
    business_type_id: Yup.string().required(
      t("required", { key: "Business Type" }) || ""
    ),
    image: Yup.mixed(),
    cut_of_date: Yup.number()
      .min(1, t("min", { key: "Cut of Date", val: 1 }) || "")
      .max(31, t("max", { key: "Cut of Date", val: 31 }) || ""),
    max_late_attendance: Yup.number()
      .min(0, t("min", { key: "Max Late Attendance", val: 1 }) || "")
      .max(60, t("max", { key: "Max Late Attendance", val: 60 }) || ""),
    show_logo_to_report: Yup.boolean(),
    address: Yup.string(),
    shipping_address: Yup.string(),
    phone: Yup.string(),
    fax: Yup.string(),
    email: Yup.string(),
    website: Yup.string(),
    npwp: Yup.string(),
  });
  const form = useForm({
    initialValues: {
      name: "",
      image: "",
      cut_of_date: 1,
      max_late_attendance: 0,
      show_logo_to_report: false,
      address: "",
      shipping_address: "",
      phone: "",
      fax: "",
      email: "",
      website: "",
      npwp: "",
      business_type_id: "",
    },
    validate: yupResolver(schema),
    transformValues: (values) => ({
      name: values?.name || "",
      image: values?.image || "",
      cut_of_date: values?.cut_of_date || 0,
      max_late_attendance: values?.max_late_attendance || 0,
      show_logo_to_report: values?.show_logo_to_report || false,
      address: values?.address || "",
      shipping_address: values?.shipping_address || "",
      phone: values?.phone || "",
      fax: values?.fax || "",
      email: values?.email || "",
      website: values?.website || "",
      npwp: values?.npwp || "",
      platform_type: "incounting",
      business_type_id: values?.business_type_id || "",
    }),
  });
  useEffect(() => {
    if (!props) return;
    form.setValues({
      name: props?.name || "",
      image: props?.logo || "",
      cut_of_date: props?.cut_of_date || 0,
      max_late_attendance: props?.max_late_attendance || 0,
      show_logo_to_report: props?.show_logo_to_report || false,
      address: props?.address || "",
      shipping_address: props?.shipping_address || "",
      phone: props?.phone || "",
      fax: props?.fax || "",
      email: props?.email || "",
      website: props?.website || "",
      npwp: props?.npwp || "",
      business_type_id: props?.type?.id || "",
    } as any);
  }, [props]);
  return form;
};

export default useFormBusinessSetting;

import { useForm, yupResolver } from "@mantine/form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const useFormBookingSource = (props: any) => {
  const { t } = useTranslation();
  const schema = Yup.object({
    company_name: Yup.string().required(
      t("required", { key: "Company Name" }) || ""
    ),
    pic_name: Yup.string(),
    email: Yup.string().required(t("required", { key: "Email" }) || ""),
    handphone: Yup.string(),
    fax: Yup.string(),
    room_commission_type: Yup.number(),
    room_commission: Yup.number(),
    type: Yup.number().required(t("required", { key: "Type" }) || ""),
    account_list_id: Yup.string(),
    phone: Yup.string(),
    npwp: Yup.string(),
    bank_account: Yup.string(),
    offline_address: Yup.string().when("type", {
      is: 2,
      then: (schema) =>
        schema.required(t("required", { key: "Offline Address" }) || ""),
    }),
    offline_address_number: Yup.string().when("type", {
      is: 2,
      then: (schema) =>
        schema.required(t("required", { key: "Offline Address Number" }) || ""),
    }),
    offline_address_rt: Yup.string().when("type", {
      is: 2,
      then: (schema) =>
        schema.required(t("required", { key: "Offline Address RT" }) || ""),
    }),
    offline_address_rw: Yup.string().when("type", {
      is: 2,
      then: (schema) =>
        schema.required(t("required", { key: "Offline Address RW" }) || ""),
    }),
    offline_address_subdistrict: Yup.string().when("type", {
      is: 2,
      then: (schema) =>
        schema.required(
          t("required", { key: "Offline Address Subdistrict" }) || ""
        ),
    }),
    offline_address_district: Yup.string().when("type", {
      is: 2,
      then: (schema) =>
        schema.required(
          t("required", { key: "Offline Address District" }) || ""
        ),
    }),
    offline_address_city: Yup.string().when("type", {
      is: 2,
      then: (schema) =>
        schema.required(t("required", { key: "Offline Address City" }) || ""),
    }),
    offline_address_province: Yup.string().when("type", {
      is: 2,
      then: (schema) =>
        schema.required(
          t("required", { key: "Offline Address Province" }) || ""
        ),
    }),
    offline_address_postal_code: Yup.string().when("type", {
      is: 2,
      then: (schema) =>
        schema.required(
          t("required", { key: "Offline Address Postal Code" }) || ""
        ),
    }),
  });
  const form = useForm({
    initialValues: {
      company_name: "",
      pic_name: "",
      email: "",
      handphone: "",
      fax: "",
      room_commission_type: "1",
      room_commission: 0,
      type: "",
      account_list_id: "",
      phone: "",
      npwp: "",
      bank_account: "",
      offline_address: "",
      offline_address_number: "",
      offline_address_rt: "",
      offline_address_rw: "",
      offline_address_subdistrict: "",
      offline_address_district: "",
      offline_address_city: "",
      offline_address_province: "",
      offline_address_postal_code: "",
    },
    validate: yupResolver(schema),
    transformValues: (values) => {
      const res: any = {
        ...values,
        room_commission_type: Number(values.room_commission_type) || 0,
        type: Number(values.type),
        account_list_id: Number(values?.account_list_id) || 0,
      };
      if (+res.type !== 2) {
        delete res.offline_address;
        delete res.offline_address_number;
        delete res.offline_address_rt;
        delete res.offline_address_rw;
        delete res.offline_address_subdistrict;
        delete res.offline_address_district;
        delete res.offline_address_city;
        delete res.offline_address_province;
        delete res.offline_address_postal_code;
      }
      return res;
    },
  });

  useEffect(() => {
    Object.keys(props).forEach((key) => {
      if (key === "type" || key === "room_commission_type") {
        form.setFieldValue(key, props[key] ? props[key]?.toString() : "");
        return;
      }
      form.setFieldValue(key, props[key]);
    });
  }, [props]);

  return form;
};

export default useFormBookingSource;

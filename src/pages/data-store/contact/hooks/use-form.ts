import { useForm, yupResolver } from "@mantine/form";
import moment from "moment";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
interface ISchema {
  name: string;
  department: string;
  contact_type: string[];
  join_date: any;
  name_type: string;
  first_name: string;
  last_name: string;
  handphone: string;
  identity_type: string;
  identity_number: string;
  email: string;
  other: string;
  company_name: string;
  phone_number: string;
  fax_number: string;
  npwp: string;
  payment_address: string;
  payment_address_number: string;
  payment_address_rt: string;
  payment_address_rw: string;
  payment_address_portal_cc: string;
  payment_address_subdistrict: string;
  payment_address_district: string;
  payment_address_city: string;
  payment_address_province: string;
  is_have_detail: boolean;
  shipping_address: string;
  is_same_address: boolean;
  banks: {
    bank_category_id: number;
    branch_office: string;
    account_name: string;
    account_number: string;
  }[];
}

const useFormContact = (props: any) => {
  const { t } = useTranslation();
  const schema = Yup.object({
    name: Yup.string().required(t("required", { key: "Name" }) || ""),
    department: Yup.string().required(
      t("required", { key: "Department" }) || ""
    ),
    contact_type: Yup.array()
      .min(1)
      .required(t("required", { key: "Contact Type" }) || ""),
    join_date: Yup.string(),
    name_type: Yup.string(),
    first_name: Yup.string(),
    last_name: Yup.string(),
    handphone: Yup.string().required(t("required", { key: "Handphone" }) || ""),
    identity_type: Yup.string().required(
      t("required", { key: "Identity Type" }) || ""
    ),
    identity_number: Yup.string().required(
      t("required", { key: "Identity Number" }) || ""
    ),
    email: Yup.string(),
    other: Yup.string(),
    company_name: Yup.string(),
    phone_number: Yup.string(),
    fax_number: Yup.string(),
    npwp: Yup.string(),
    payment_address: Yup.string(),
    payment_address_number: Yup.string(),
    payment_address_rt: Yup.string(),
    payment_address_rw: Yup.string(),
    payment_address_portal_cc: Yup.string(),
    payment_address_subdistrict: Yup.string(),
    payment_address_district: Yup.string(),
    payment_address_city: Yup.string(),
    payment_address_province: Yup.string(),
    is_have_detail: Yup.boolean(),
    shipping_address: Yup.string(),
    is_same_address: Yup.boolean(),
    banks: Yup.array().of(
      Yup.object().shape({
        bank_category_id: Yup.number().required(
          t("required", { key: "Bank Category" }) || ""
        ),
        branch_office: Yup.string().required(
          t("required", { key: "Branch Office" }) || ""
        ),
        account_name: Yup.string().required(
          t("required", { key: "Account Name" }) || ""
        ),
        account_number: Yup.string().required(
          t("required", { key: "Account Number" }) || ""
        ),
      })
    ),
  });

  const form = useForm<ISchema>({
    initialValues: {
      name: "",
      department: "",
      contact_type: [],
      join_date: moment(),
      name_type: "",
      first_name: "",
      last_name: "",
      handphone: "",
      identity_type: "",
      identity_number: "",
      email: "",
      other: "",
      company_name: "",
      phone_number: "",
      fax_number: "",
      npwp: "",
      payment_address: "",
      payment_address_number: "",
      payment_address_rt: "",
      payment_address_rw: "",
      payment_address_portal_cc: "",
      payment_address_subdistrict: "",
      payment_address_district: "",
      payment_address_city: "",
      payment_address_province: "",
      is_have_detail: false,
      shipping_address: "",
      is_same_address: false,
      banks: [],
    },
    transformValues: (values) => {
      const res: any = {
        nickname: values?.name,
        division_id: values?.department,
        is_customer: values?.contact_type?.includes("customer"),
        is_supplier: values?.contact_type?.includes("supplier"),
        is_employee: values?.contact_type?.includes("employee"),
        is_other: values?.contact_type?.includes("other"),
        join_date: values?.join_date
          ? moment(values?.join_date).format("YYYY-MM-DD")
          : "",
        name_type: values?.name_type || "",
        first_name: values?.first_name || "",
        last_name: values?.last_name || "",
        handphone: values?.handphone || "",
        identity_type: values?.identity_type || "",
        identity_number: values?.identity_number || "",
        email: values?.email || "",
        other_info: values?.other || "",
        company_name: values?.company_name || "",
        phone: values?.phone_number || "",
        fax: values?.fax_number || "",
        npwp: values?.npwp || "",
        payment_address: values?.payment_address || "",
        shipping_address: values?.shipping_address || "",
        bank: values?.banks || [],
      };
      if (values?.is_have_detail) {
        res.payment_address_number = values?.payment_address_number || "";
        res.payment_address_rt = values?.payment_address_rt || "";
        res.payment_address_rw = values?.payment_address_rw || "";
        res.payment_address_postal_code =
          values?.payment_address_portal_cc || "";
        res.payment_address_subdistrict =
          values?.payment_address_subdistrict || "";
        res.payment_address_district = values?.payment_address_district || "";
        res.payment_address_city = values?.payment_address_city || "";
        res.payment_address_province = values?.payment_address_province || "";
      }
      if (values?.is_same_address) {
        res.shipping_address = values?.payment_address || "";
      }
      return res;
    },
    validate: yupResolver(schema),
  });

  useEffect(() => {
    if (!props) return;
    const newForm: Partial<ISchema> = {
      name: props?.nickname || "",
      department: props?.division?.id || "",
      contact_type: [],
      join_date: props?.join_date ? moment(props?.join_date) : moment(),
      name_type: props?.name_type || "",
      first_name: props?.first_name || "",
      last_name: props?.last_name || "",
      handphone: props?.handphone || "",
      identity_type: props?.identity_type || "",
      identity_number: props?.identity_number || "",
      email: props?.email || "",
      other: props?.other_info || "",
      company_name: props?.company_name || "",
      phone_number: props?.phone || "",
      fax_number: props?.fax || "",
      npwp: props?.npwp || "",
      payment_address: props?.payment_address || "",
      payment_address_number: props?.payment_address_number || "",
      payment_address_rt: props?.payment_address_rt || "",
      payment_address_rw: props?.payment_address_rw || "",
      payment_address_portal_cc: props?.payment_address_postal_code || "",
      payment_address_subdistrict: props?.payment_address_subdistrict || "",
      payment_address_district: props?.payment_address_district || "",
      payment_address_city: props?.payment_address_city || "",
      payment_address_province: props?.payment_address_province || "",
      is_have_detail: !!props?.payment_address_number,
      shipping_address: props?.shipping_address || "",
      is_same_address: props?.shipping_address === props?.payment_address,
      banks:
        props?.banks?.map((val: any) => ({
          bank_category_id: val?.bank_category?.id || "",
          branch_office: val?.branch_office || "",
          account_name: val?.account_name || "",
          account_number: val?.account_number || "",
        })) || [],
    };
    if (props?.is_customer) newForm.contact_type?.push("customer");
    if (props?.is_supplier) newForm.contact_type?.push("supplier");
    if (props?.is_employee) newForm.contact_type?.push("employee");
    if (props?.is_other) newForm.contact_type?.push("other");
    form.setValues(newForm);
  }, [props]);

  const handleAddBank = () => {
    const newBanks = form.values?.banks || [];
    newBanks.push({} as any);
    form.setValues({
      ...form.values,
      banks: newBanks,
    });
  };

  const handleRemoveBank = (index: number) => {
    const newBanks = form.values?.banks || [];
    newBanks.splice(index, 1);
    form.setValues({
      ...form.values,
      banks: newBanks,
    });
  };

  return {
    form,
    handleAddBank,
    handleRemoveBank,
  };
};

export default useFormContact;

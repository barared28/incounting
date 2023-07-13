import { useForm, yupResolver } from "@mantine/form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

interface IPropsForm {
  name?: string;
  price?: number;
  [key: string]: any;
}

const useFormPropertyType = (props: IPropsForm) => {
  const { t } = useTranslation();
  const schema = Yup.object({
    name: Yup.string().required(t("required", { key: "Name" }) || ""),
    price: Yup.number()
      .min(0)
      .required(t("required", { key: "Price" }) || ""),
  });
  const form = useForm({
    initialValues: {
      name: props?.name || "",
      price: props?.price || 0,
    },
    validate: yupResolver(schema),
  });
  useEffect(() => {
    if (props) {
      Object.keys(props).forEach((key) => {
        form.setFieldValue(key, props[key]);
      });
    }
  }, [props]);
  return form;
};

export default useFormPropertyType;

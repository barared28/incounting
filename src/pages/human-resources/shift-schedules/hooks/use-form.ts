import { useForm, yupResolver } from "@mantine/form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const useFormShiftSchedule = (data: any) => {
  const { t } = useTranslation();
  const schema = Yup.object({
    name: Yup.string().required(t("required", { key: "Name" }) || ""),
    start_time: Yup.string().required(
      t("required", { key: "Start Time" }) || ""
    ),
    end_time: Yup.string().required(t("required", { key: "End Time" }) || ""),
    start_break: Yup.string().required(
      t("required", { key: "Start Break" }) || ""
    ),
    end_break: Yup.string().required(t("required", { key: "End Break" }) || ""),
    description: Yup.string(),
  });
  const form = useForm({
    initialValues: {
      name: "",
      start_time: "",
      end_time: "",
      start_break: "",
      end_break: "",
      description: "",
    },
    validate: yupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        name: data.name,
        start_time: data.start_time,
        end_time: data.end_time,
        start_break: data.start_break,
        end_break: data.end_break,
        description: data.description,
      });
    }
  }, [data]);

  return { form };
};

export default useFormShiftSchedule;

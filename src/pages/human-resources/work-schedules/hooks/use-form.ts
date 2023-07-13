import { useForm, yupResolver } from "@mantine/form";
import moment from "moment";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { DAYS } from "../components/form";

const useFormWorkSchedule = () => {
  const { t } = useTranslation();
  const schema = Yup.object({
    shifting_id: Yup.string().required(
      t("required", { key: "Shifting" }) || ""
    ),
    start_effective_date: Yup.string().required(
      t("required", { key: "Start Effective Date" }) || ""
    ),
    repeat_on: Yup.boolean(),
    employee_ids: Yup.array()
      .required(t("required", { key: "Employee" }) || "")
      .min(1, t("required", { key: "Employee" }) || ""),
    repeat_on_week: Yup.string().when("repeat_on", {
      is: true,
      then: (schema) =>
        schema.required(t("required", { key: "Repeat On Week" }) || ""),
    }),
    end_effective_date: Yup.string().when("repeat_on", {
      is: true,
      then: (schema) =>
        schema.required(t("required", { key: "End Effective Date" }) || ""),
    }),
    days: Yup.array().when("repeat_on", {
      is: true,
      then: (schema) => schema.required(t("required", { key: "Days" }) || ""),
    }),
  });

  const form = useForm({
    initialValues: {
      shifting_id: "",
      start_effective_date: moment(),
      repeat_on: false,
      employee_ids: [],
      repeat_on_week: "",
      end_effective_date: moment(),
      days: [DAYS[moment().day() - 1]?.value],
    },
    validate: yupResolver(schema),
    transformValues: (values) => ({
      ...values,
      start_effective_date: moment(values?.start_effective_date).format(
        "YYYY-MM-DD"
      ),
      end_effective_date: values?.end_effective_date
        ? moment(values?.end_effective_date).format("YYYY-MM-DD")
        : "",
      repeat_on_week: +values?.repeat_on_week || 0,
    }),
  });

  return { form };
};

export default useFormWorkSchedule;

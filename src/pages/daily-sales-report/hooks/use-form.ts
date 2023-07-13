import { useForm, yupResolver } from "@mantine/form";
import moment from "moment";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const useFormDailySalesReport = () => {
  const { t } = useTranslation();
  const schema = Yup.object({
    date: Yup.string().required(t("required", { key: "Date" }) || ""),
    withMonth: Yup.boolean(),
    month: Yup.string(),
    reports: Yup.array()
      .of(Yup.string().required(t("required", { key: "Date" }) || ""))
      .min(1),
  });
  const form = useForm({
    initialValues: {
      date: moment(),
      withMonth: true,
      reports: [
        "room_statistic",
        "room_revenue",
        "average_rate",
        "daily_sales_report",
      ],
    },
    transformValues: (values) => {
      return {
        date: moment(values.date).format("YYYY-MM-DD"),
        room_statistic: values.reports.includes("room_statistic"),
        room_revenue: values.reports.includes("room_revenue"),
        average_rate: values.reports.includes("average_rate"),
        daily_sales_report: values.reports.includes("daily_sales_report"),
        with_month: !!values.withMonth,
      };
    },
    validate: yupResolver(schema),
  });

  return form;
};

export default useFormDailySalesReport;

import { UseFormReturnType, useForm, yupResolver } from "@mantine/form";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getNextDate } from "@/utils/date";
import moment from "moment";

export interface IDownPayment {
  percentage: number;
  amount: number;
  rest: number;
  [key: string]: any;
}

export const useFormPaymentSchedule = () => {
  const [downPayment, setDownPayment] = useState<IDownPayment[]>([]);
  const { t } = useTranslation();
  const schema = Yup.object({
    contact_id: Yup.string().required(t("required", { key: "Customer" }) || ""),
    product_id: Yup.string().required(t("required", { key: "Property" }) || ""),
    price: Yup.string().required(
      t("required", { key: "Price Property" }) || ""
    ),
    fee: Yup.number().required(t("required", { key: "Fee" }) || ""),
    installment: Yup.number().required(
      t("required", { key: "Instalment" }) || ""
    ),
    date: Yup.string().required(),
  });
  const form = useForm({
    initialValues: {
      contact_id: "",
      product_id: "",
      price: 0,
      fee: 0,
      installment: 0,
      total: 0,
      date: "",
      month: moment(),
    },
    validate: yupResolver(schema),
    transformValues: (values) => {
      const res: any = {
        contact_id: +values?.contact_id || "",
        fee: values?.fee || 0,
        property_id: +values?.product_id,
        property_price: values?.price,
        installment: values?.installment,
        installment_date: values?.date,
        dp_installment: downPayment?.length || 0,
        installment_date_start: getNextDate(
          +values?.date,
          downPayment?.length,
          moment(values.month).format("MM-YYYY") || "",
          "YYYY-MM-DD"
        ),
      };
      if (downPayment?.length > 0) {
        res.down_payments = downPayment?.map((item) => ({
          percentage: item?.percentage,
          price_total: item?.amount,
        }));
        res.dp_installment_date = values?.date;
        res.dp_installment_date_start = getNextDate(
          +values?.date,
          0,
          moment(values.month).format("MM-YYYY") || "",
          "YYYY-MM-DD"
        );
      }
      return res;
    },
  });

  const resetState = () => {
    form.reset();
    setDownPayment([]);
  };
  return {
    form,
    downPayment,
    setDownPayment,
    resetState,
  };
};

interface IPropsPayment {
  form: UseFormReturnType<any>;
  downPayment: IDownPayment[];
  setDownPayment: any;
}

export const useCustomPaymentForm = (props: IPropsPayment) => {
  const { form, downPayment, setDownPayment } = props;
  // Calculate the total down payment amount
  const totalDownPaymentAmount = downPayment.reduce(
    (acc, curr) => acc + curr?.amount,
    0
  );

  // Calculate the total down payment percentage
  const totalDownPaymentPercentage = downPayment.reduce(
    (acc, curr) => acc + curr?.percentage,
    0
  );

  // Calculate the total
  const total = form?.values?.total || 0;

  // Calculate the total installment
  const totalInstallment = total - totalDownPaymentAmount;

  // Calculate the payment date
  const paymentDate = form?.values?.date;

  // Calculate the installment
  const installment = form?.values?.installment || 0;

  // Get the month from form values
  const month = form?.values?.month
    ? moment(form.values.month).format("MM-YYYY")
    : "";

  useEffect(() => {
    // Get the price of the item from the form values
    const price = form?.values?.price || 0;
    // Get the fee from the form values
    const fee = form?.values?.fee || 0;
    // Add the price and fee together to get the total
    const total = price + fee;
    // Update the form values with the new total
    form.setFieldValue("total", total);
  }, [form?.values?.fee, form?.values?.price]);

  const handleAddDownPayment = () => {
    // create a new array from the downPayment state
    const newRes = [...downPayment];
    // push a new object to the array
    newRes?.push({
      percentage: 0,
      amount: 0,
      rest: 0,
    });
    // set the new array to the state
    setDownPayment(newRes);
  };

  const handleDeleteDownPayment = (index: number) => {
    // create a new array from the downPayment state
    const newRes = [...downPayment];
    // use the splice method to remove the item
    newRes?.splice(index, 1);
    // set the new array to the state
    setDownPayment(newRes);
  };

  const handleEditDownPayment = (index: number, key: string, value: any) => {
    // create a new array from the downPayment state
    const newRes = [...downPayment];
    // if the key is percentage, update the amount and rest
    if (key === "percentage") {
      const amount = generateAmmountFromPercent(total, value);
      const rest = total - amount;
      newRes[index].amount = amount;
      newRes[index].rest = rest;
      setDownPayment(newRes);
    }
    // if the key is amount, update the percentage and rest
    if (key === "amount") {
      const percentage = generatePercentFromAmount(total, value);
      const rest = total - value;
      newRes[index].percentage = percentage;
      newRes[index].rest = rest;
      setDownPayment(newRes);
    }
    // update the value of the key
    newRes[index][key] = value;
    // set the new array to the state
    setDownPayment(newRes);
  };

  // Find the percentage of the total that the ammount is.
  // Return the percentage, rounded down to a whole number.
  const generatePercentFromAmount = (total: number, ammount: number) => {
    return Math.floor((ammount / total) * 100);
  };

  // Find the ammount of total that a percentage is.
  // Return the ammount, rounded down to a whole number.
  const generateAmmountFromPercent = (total: number, percent: number) => {
    return Math.floor((percent / 100) * total);
  };

  // 1. Check if the total is bigger than 0
  const caculateRestEachDownPayment = () => {
    if (total <= 0) return;
    // 2. Save the total to a temporary variable
    let tempTotal = total;
    // 3. Use map to iterate the downPayment array
    // 4. Calculate the rest by subtracting the amount from the temporary variable
    // 5. Update the temporary variable with the rest
    // 6. Return the updated downPayment array
    const newDownPayments = downPayment.map((downPayment) => {
      const amount = downPayment?.amount || 0;
      const rest = tempTotal - amount;
      tempTotal = rest;
      return {
        ...downPayment,
        rest,
      };
    });
    setDownPayment(newDownPayments);
  };

  useEffect(() => {
    // Calculate the rest of the down payment when the total or down payment changes
    caculateRestEachDownPayment();
  }, [total, downPayment]);

  // Calculate next payment date based on payment date and down payment length
  function calculateNextPaymentDate(
    paymentDate: number,
    downPaymentLength: number,
    index: number
  ): string {
    // If payment date is given, calculate next payment date based on down payment length
    // Otherwise, return "-"
    return paymentDate
      ? getNextDate(
          paymentDate,
          downPaymentLength > 0 ? downPaymentLength + index : index,
          month
        )
      : "-";
  }

  // Calculate each payment amount based on installment number and total installment
  function calculatePaymentAmount(
    index: number,
    installment: number,
    totalInstallment: number
  ): number {
    // If the installment number is the same as current index, return the remaining amount
    // Otherwise, return the amount of each payment
    if (index + 1 === installment) {
      return (
        Math.floor(totalInstallment / installment) +
        totalInstallment -
        Math.floor(totalInstallment / installment) * (index + 1)
      );
    } else {
      return Math.floor(totalInstallment / installment);
    }
  }

  // Calculate remaining amount based on installment number and total installment
  function calculateRemainingAmount(
    index: number,
    installment: number,
    totalInstallment: number
  ) {
    // If the installment number is the same as current index, return 0
    // Otherwise, return the remaining amount
    if (index + 1 === installment) {
      return 0;
    } else {
      return (
        totalInstallment -
        Math.floor(totalInstallment / installment) * (index + 1)
      );
    }
  }

  return {
    paymentDate,
    handleEditDownPayment,
    handleDeleteDownPayment,
    handleAddDownPayment,
    totalDownPaymentPercentage,
    totalDownPaymentAmount,
    total,
    totalInstallment,
    installment,
    downPayment,
    month,
    calculateNextPaymentDate,
    calculatePaymentAmount,
    calculateRemainingAmount,
  };
};

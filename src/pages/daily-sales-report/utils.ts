import { formatIDR } from "@/utils/currency";

export const handleNullValue = (
  value: number | undefined | null,
  type?: "currency" | "percent"
) => {
  if (value === null || value === undefined) {
    return "-";
  }

  if (type === "currency") {
    return formatIDR(value);
  }

  if (type === "percent") {
    return `${value.toLocaleString("id-ID")} %`;
  }

  return value;
};

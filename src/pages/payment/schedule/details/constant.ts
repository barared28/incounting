import { SelectItem } from "@mantine/core";

export const StatusOptions: readonly (string | SelectItem)[] = [
  {
    label: "Paid",
    value: "1",
  },
  {
    label: "Unpaid",
    value: "0",
  },
  {
    label: "Unbill",
    value: "3",
  },
  {
    label: "Postpone",
    value: "2",
  },
];

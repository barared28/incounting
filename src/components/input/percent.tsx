import { NumberInput, NumberInputProps } from "@mantine/core";

const PercentageInput = (props: NumberInputProps) => {
  return (
    <NumberInput
      parser={(value) => value.replace(/%/g, "")}
      formatter={(value) =>
        !Number.isNaN(parseFloat(value)) ? `${value}%` : ""
      }
      min={0}
      max={100}
      {...props}
    />
  );
};

export default PercentageInput;

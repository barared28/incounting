import { NumberInput, NumberInputProps } from "@mantine/core";

const RupiahInput = (props: NumberInputProps) => (
  <NumberInput
    parser={(value) => value.replace(/Rp\s?|(,*)/g, "")}
    formatter={(value) =>
      !Number.isNaN(parseFloat(value))
        ? `Rp ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
        : "Rp "
    }
    hideControls
    {...props}
  />
);

export default RupiahInput;

import { Select, SelectProps } from "@mantine/core";
import useOptionShifting from "./hooks";

const SelectShifting = (props: SelectProps) => {
  const { data: _, ...restProps } = props;
  const { data } = useOptionShifting();
  return <Select data={data} {...restProps} />;
};

export default SelectShifting;

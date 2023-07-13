import { MultiSelect, MultiSelectProps } from "@mantine/core";
import useCustomHookMultipleSelectEmployee from "./hooks";

interface IProps extends Partial<MultiSelectProps> {
  selectedData?: any[];
}

const MultipleSelectEmployee = (props: IProps) => {
  const { data: _, selectedData, onChange, ...restProps } = props;
  const { data, setSearch, handleChangeSelect } =
    useCustomHookMultipleSelectEmployee();
  return (
    <MultiSelect
      data={data}
      searchable
      nothingFound="No employee found"
      onSearchChange={(value) => setSearch(value)}
      {...restProps}
      onChange={(value) => {
        handleChangeSelect(value);
        onChange && onChange(value);
      }}
    />
  );
};

export default MultipleSelectEmployee;

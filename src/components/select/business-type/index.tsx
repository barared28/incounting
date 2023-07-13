import { Loader, Select, SelectProps } from "@mantine/core";
import { useOptionBusinessType } from "./hooks";

interface IProps extends Partial<SelectProps> {
  selectedData?: any;
}

const SelectBusinessType = (props: IProps) => {
  const { data: _, selectedData, ...restProps } = props;
  const { data, isLoading } = useOptionBusinessType(selectedData);
  return (
    <Select
      data={data}
      nothingFound={
        isLoading ? (
          <Loader mt="sm" size="sm" />
        ) : (
          "Sorry, no options available."
        )
      }
      {...restProps}
    />
  );
};

export default SelectBusinessType;

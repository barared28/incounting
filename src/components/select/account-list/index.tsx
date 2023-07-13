import { Flex, Select, SelectProps, Text } from "@mantine/core";
import { useOptionAccountList } from "./hooks";
import { forwardRef } from "react";

interface IPropsItem extends React.ComponentPropsWithoutRef<"div"> {
  name: string;
  label: string;
  code: string;
}

const SelectItem = forwardRef<HTMLDivElement, IPropsItem>(
  ({ label, code, ...restProps }, ref) => (
    <div ref={ref} {...restProps}>
      <Flex direction="column">
        <Text weight={500}>{label}</Text>
        <Text size="xs" italic>
          {`Code: ${code}`}
        </Text>
      </Flex>
    </div>
  )
);

interface IProps extends Partial<SelectProps> {
  selectedData?: {
    name: string;
    price: number;
    id: number;
  };
}

const SelectAccountList = (props: IProps) => {
  const { data: _, selectedData, ...restProps } = props;
  const { dataOption, setSearch, search } = useOptionAccountList();

  return (
    <Select
      label="Commission Account"
      data={dataOption}
      searchable
      onSearchChange={(val) => {
        if (!dataOption.find((it) => val === it.label)) {
          setSearch(val);
        } else if (val !== search && !val) {
          setSearch("");
        }
      }}
      withinPortal
      nothingFound="Sorry, no options available."
      itemComponent={SelectItem}
      {...restProps}
    />
  );
};

export default SelectAccountList;

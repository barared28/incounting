import { formatIDR } from "@/utils/currency";
import { Box, Flex, Select, SelectProps, Text } from "@mantine/core";
import { IconBuilding } from "@tabler/icons-react";
import { forwardRef, useEffect, useState } from "react";
import { useOptionPropertyType } from "./hooks";
import { generateDataOption } from "./utils";

interface IPropsItem extends React.ComponentPropsWithoutRef<"div"> {
  name: string;
  price: number;
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, IPropsItem>(
  ({ name, price, label, ...restProps }, ref) => (
    <div ref={ref} {...restProps} data-cy="option-property-type">
      <Flex gap="sm" align="center">
        <IconBuilding />
        <Box>
          <Text size="sm" weight={500}>
            {name}
          </Text>
          <Text size="xs" italic>
            {formatIDR(price)}
          </Text>
        </Box>
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

export interface IDataOptionPropertyType {
  name: string;
  price: number;
  label: string;
  value: string;
}

const SelectPropertyType = (props: IProps) => {
  const { data: _, selectedData, ...restProps } = props;
  const [search, setSearch] = useState("");
  const [dataOption, setDataOption] = useState<IDataOptionPropertyType[]>([]);
  const { data, refetch } = useOptionPropertyType({ search });

  useEffect(() => {
    refetch();
  }, [search]);

  useEffect(() => {
    const res = generateDataOption(
      data?.data || [],
      selectedData,
      restProps.value || ""
    );
    setDataOption(res);
  }, [data, data?.data, selectedData]);

  return (
    <Select
      label="Property Type"
      searchable
      onSearchChange={(val) => {
        if (!dataOption.find((it) => val === it.label)) {
          setSearch(val);
        } else if (val !== search && !val) {
          setSearch("");
        }
      }}
      itemComponent={SelectItem}
      data={dataOption}
      withinPortal
      nothingFound="Sorry, no options available."
      icon={<IconBuilding size={18} />}
      {...restProps}
    />
  );
};

export default SelectPropertyType;

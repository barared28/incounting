import { Box, Flex, Select, SelectProps, Text } from "@mantine/core";
import { IconBuildingSkyscraper } from "@tabler/icons-react";
import { forwardRef, useEffect, useState } from "react";
import { useOptionProperty } from "./hooks";
import { generateDataOption } from "./utils";
import { formatIDR } from "@/utils/currency";

interface IPropsItem extends React.ComponentPropsWithoutRef<"div"> {
  name: string;
  typeName: string;
  price: number;
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, IPropsItem>(
  ({ name, typeName, price, label, ...restProps }, ref) => (
    <div ref={ref} {...restProps}>
      <Flex gap="sm" align="center">
        <IconBuildingSkyscraper />
        <Box>
          <Text weight={500}>{name}</Text>
          <Text size="xs">{`Type: ${typeName || "-"} | Price: ${formatIDR(
            price
          )}`}</Text>
        </Box>
      </Flex>
    </div>
  )
);

interface IProps extends Partial<SelectProps> {}

export interface IDataOptionProperty {
  name: string;
  typeName: string;
  price: number;
  label: string;
  value: string;
}

const SelectProperty = (props: IProps) => {
  const { data: _, ...restProps } = props;
  const [search, setSearch] = useState("");
  const [dataOption, setDataOption] = useState<IDataOptionProperty[]>([]);
  const { data } = useOptionProperty({ search });

  useEffect(() => {
    const res = generateDataOption(data?.data || []);
    setDataOption(res);
  }, [data, data?.data]);

  return (
    <Select
      label="Property"
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
      icon={<IconBuildingSkyscraper size={18} />}
      nothingFound="Sorry, no options available."
      withAsterisk
      placeholder="Choose Property"
      {...restProps}
    />
  );
};

export default SelectProperty;

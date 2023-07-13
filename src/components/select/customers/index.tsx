import { Avatar, Box, Flex, Select, SelectProps, Text } from "@mantine/core";
import { forwardRef, useState, useEffect } from "react";
import { useOptionCustomers } from "./hooks";
import { generateDataOption } from "./utils";
import { convertInitial } from "@/utils";
import { IconUserCircle } from "@tabler/icons-react";

interface IPropsItem extends React.ComponentPropsWithoutRef<"div"> {
  name: string;
  image?: string;
  email: string;
}

const SelectItem = forwardRef<HTMLDivElement, IPropsItem>(
  ({ name, image, email, ...restProps }, ref) => (
    <div ref={ref} {...restProps}>
      <Flex gap="sm" align="center">
        <Box>
          {image ? (
            <Avatar size="sm" color="gray" radius="xl" src={image} />
          ) : (
            <Avatar size="sm" color="gray" radius="xl" variant="filled">
              {name ? convertInitial(name) : ""}
            </Avatar>
          )}
        </Box>
        <Box>
          <Text size="sm" weight={500}>
            {name}
          </Text>
          <Text size="xs" italic>
            {email || "-"}
          </Text>
        </Box>
      </Flex>
    </div>
  )
);

interface IProps extends Partial<SelectProps> {
  filterType?: number;
  selectedData?: any;
}

export interface IDataOptionCustomers {
  name: string;
  image?: string;
  email: string;
  value: string;
  label: string;
}

const SelectCustomers = (props: IProps) => {
  const { data: _, filterType, selectedData, ...restProps } = props;
  const [search, setSearch] = useState("");
  const [dataOption, setDataOption] = useState<IDataOptionCustomers[]>([]);
  const { data } = useOptionCustomers({ search, type: filterType || 5 });

  useEffect(() => {
    const res = generateDataOption(data?.data || [], selectedData);
    setDataOption(res);
  }, [data, data?.data, selectedData]);

  return (
    <Select
      label="Customer"
      withAsterisk
      searchable
      onSearchChange={(val) => {
        if (!dataOption.find((it) => val === it.label)) {
          setSearch(val);
        } else if (val !== search && !val) {
          setSearch("");
        }
      }}
      data={dataOption || []}
      withinPortal
      nothingFound="Sorry, no options available."
      itemComponent={SelectItem}
      icon={<IconUserCircle size={18} />}
      placeholder="Choose Customer"
      {...restProps}
    />
  );
};

export default SelectCustomers;

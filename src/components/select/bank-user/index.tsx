import {
  Button,
  Center,
  Flex,
  Loader,
  ScrollArea,
  Select,
  SelectProps,
  Text,
} from "@mantine/core";
import { forwardRef, useState } from "react";
import { useOptionBankUser } from "./hooks";

const SelectItem = forwardRef<HTMLDivElement, any>(
  ({ number, label, ...restProps }, ref) => (
    <div ref={ref} {...restProps}>
      <Flex direction="column">
        <Text weight={500}>{label}</Text>
        <Text size="xs">{number}</Text>
      </Flex>
    </div>
  )
);

const ContainerDropdown = (handleAddBank?: () => void) =>
  forwardRef<HTMLDivElement, any>(({ children, ...restProps }, ref) => (
    <ScrollArea.Autosize ref={ref} {...restProps}>
      {children}
      <Center p={4}>
        <Button w="100%" size="xs" variant="outline" onClick={handleAddBank}>
          Add Bank
        </Button>
      </Center>
    </ScrollArea.Autosize>
  ));

interface IProps extends Partial<SelectProps> {
  contactId: number;
  handleAddBank?: () => void;
}

const SelectBankUser = (props: IProps) => {
  const { data: _, contactId, handleAddBank, ...restProps } = props;
  const [search, setSearch] = useState("");
  const { data, isLoading } = useOptionBankUser(contactId, search);
  return (
    <Select
      searchable
      withinPortal
      onSearchChange={(val) => {
        if (!data?.find((it: any) => val === it.label)) {
          setSearch(val);
        } else if (val !== search && !val) {
          setSearch("");
        }
      }}
      nothingFound={
        isLoading ? (
          <Loader mt="sm" size="sm" />
        ) : (
          "Sorry, no options available."
        )
      }
      data={data}
      itemComponent={SelectItem}
      dropdownComponent={ContainerDropdown(handleAddBank)}
      {...restProps}
    />
  );
};

export default SelectBankUser;

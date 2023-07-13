import { Loader, Select, SelectProps } from "@mantine/core";
import { useState } from "react";
import { useOptionBankCategory } from "./hooks";

interface IProps extends Partial<SelectProps> {
  selectedData?: any;
}

const SelectBankCategory = (props: IProps) => {
  const { data: _, selectedData, ...restProps } = props;
  const [search, setSearch] = useState("");
  const { data, isLoading } = useOptionBankCategory(search, selectedData);
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
      {...restProps}
    />
  );
};

export default SelectBankCategory;

import { useState } from "react";
import { Loader, Select, SelectProps } from "@mantine/core";
import { useOptionDepartment } from "./hooks";

interface IProps extends Partial<SelectProps> {}

const SelectDepartment = (props: IProps) => {
  const { data: _, ...resProps } = props;
  const [search, setSearch] = useState("");
  const { data, isLoading } = useOptionDepartment(search);

  return (
    <Select
      label="Department"
      searchable
      data={data}
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
      {...resProps}
    />
  );
};

export default SelectDepartment;

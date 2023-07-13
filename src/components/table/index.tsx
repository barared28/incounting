import {
  Box,
  Flex,
  Overlay,
  Pagination,
  Select,
  Table as TableRaw,
} from "@mantine/core";
import { Column, useTable } from "react-table";
import { useMemo } from "react";
import { ColumnTable } from "@/types";
import SimpleLoader from "../loader/simple";
import EmptyData from "../indicator/empty";

interface TableProps<T extends object> {
  columns: ColumnTable<T>[];
  data: T[];
  page?: number;
  limit?: number;
  total?: number;
  onChangePagination?: (page: number, limit: number) => void;
  verticalSpacing?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  isRefetching?: boolean;
  footerComponent?: React.ReactNode;
  additionalRowsComponent?: React.ReactNode;
  withBorder?: boolean;
}

const LIMIT_OPTION = [5, 10, 20, 25, 30, 40, 50, 100];

function Table<T extends object>(props: TableProps<T>) {
  const {
    columns,
    data,
    page = 1,
    limit = 10,
    total = 0,
    onChangePagination = () => {},
    verticalSpacing = "lg",
    loading,
    isRefetching,
    footerComponent,
    additionalRowsComponent,
    withBorder = false,
  } = props;
  const columnsTable: readonly Column<T>[] = useMemo<
    readonly Column<T>[]
  >(() => {
    const res: any = columns.map((val) => {
      const result: any = {
        Header: val?.Header,
        accessor: val?.accessor,
      };
      if (val?.Cell) {
        result.Cell = val.Cell;
      }
      if (val?.width) {
        result.width = val.width;
      }
      if (val?.maxWidth) {
        result.maxWidth = val.maxWidth;
      }
      return result;
    });
    return res;
  }, [columns]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<T>({ columns: columnsTable, data });

  return (
    <>
      <Box pos="relative">
        <TableRaw
          {...getTableProps()}
          striped
          highlightOnHover
          verticalSpacing={verticalSpacing}
          withBorder={withBorder}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {!loading &&
              rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            {additionalRowsComponent || null}
          </tbody>
          {footerComponent || null}
        </TableRaw>
        {(!data || data?.length <= 0) && !isRefetching && !loading ? (
          <EmptyData />
        ) : null}
        {loading ? (
          <Flex w="100%" h={200} justify="center" align="center">
            <SimpleLoader />
          </Flex>
        ) : null}
        {isRefetching ? (
          <Flex
            w="100%"
            h="100%"
            pos="absolute"
            top={0}
            left={0}
            justify="center"
            align="center"
          >
            <Overlay blur={2} opacity={0.1} center bg="none">
              <SimpleLoader />
            </Overlay>
          </Flex>
        ) : null}
      </Box>
      {total > 5 ? (
        <Flex justify="space-between" mt="sm" gap="sm">
          <Pagination
            value={page}
            total={Math.ceil(total / limit)}
            size="sm"
            onChange={(val) => onChangePagination(+val, limit)}
            disabled={isRefetching || loading}
          />
          <Select
            data={LIMIT_OPTION.map((val) => ({
              value: String(val),
              label: `${val} items`,
            }))}
            size="xs"
            defaultValue={String(limit)}
            value={String(limit)}
            onChange={(val) => onChangePagination(1, val ? +val : 10)}
            allowDeselect={false}
            withinPortal
            disabled={isRefetching || loading}
          />
        </Flex>
      ) : null}
    </>
  );
}

export default Table;

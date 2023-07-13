import { ColumnTable } from "@/types";
import { useStylesTableStyled } from "./styles";
import { useMemo } from "react";
import { Column, useTable } from "react-table";
import {
  Box,
  Button,
  Card,
  Flex,
  Loader,
  Overlay,
  Pagination,
  ScrollArea,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import SimpleLoader from "../loader/simple";
import { useTranslation } from "react-i18next";
import { IconPlus, IconSearch } from "@tabler/icons-react";

interface IPropsTable<T extends object> {
  columns: ColumnTable<T>[];
  data: T[];
  loading?: boolean;
  disableSearch?: boolean;
  handleSearch?: (val: string) => void;
  disableCreate?: boolean;
  leftContent?: JSX.Element;
  rightContent?: JSX.Element;
  withoutHeader?: boolean;
  page?: number;
  limit?: number;
  total?: number;
  onChangePagination?: (page: number, limit: number) => void;
  handleCreate?: () => void;
  descLabelSearch?: string;
  flipContentRight?: boolean;
  disablePagination?: boolean;
}

const LIMIT_OPTION = [5, 10, 20, 25, 30, 40, 50, 100];

function TableStyled<T extends object>(props: IPropsTable<T>) {
  const {
    columns,
    data,
    loading,
    disableCreate,
    disableSearch,
    rightContent,
    leftContent,
    withoutHeader,
    limit = 10,
    page = 1,
    total = 0,
    onChangePagination = () => {},
    handleSearch = () => {},
    handleCreate = () => {},
    descLabelSearch = "",
    flipContentRight = false,
    disablePagination = false,
  } = props;
  const { classes } = useStylesTableStyled();
  const { t } = useTranslation();

  const columnsTable: readonly Column<T>[] = useMemo<
    readonly Column<T>[]
  >(() => {
    const res: any = columns;
    return res;
  }, [columns]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<T>({
      columns: columnsTable,
      data: data,
    });

  return (
    <>
      {withoutHeader ? null : (
        <Flex justify="space-between" align="end" wrap="wrap" gap="sm" mb="md">
          <Flex gap="sm" wrap="wrap">
            {disableSearch ? null : (
              <TextInput
                placeholder="Search"
                type="search"
                rightSection={<IconSearch size={16} />}
                onChange={(val) => handleSearch(val?.target?.value)}
                description={descLabelSearch || null}
              />
            )}
            {leftContent || null}
          </Flex>
          <Flex gap="xs" direction={flipContentRight ? "row-reverse" : "row"}>
            {disableCreate ? null : (
              <Button
                leftIcon={<IconPlus size={16} />}
                onClick={handleCreate}
                data-cy="create-new"
              >
                Create New
              </Button>
            )}
            {rightContent || null}
          </Flex>
        </Flex>
      )}
      <Box pos="relative">
        <ScrollArea.Autosize>
          <table {...getTableProps()} className={classes.table}>
            <thead className={classes.thead}>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className={classes["tr-head"]}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className={classes["th-head"]}
                      style={{
                        width: column.width,
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                      }}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className={classes.tbody}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className={classes["tr-body"]}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className={classes["td-body"]}
                        style={{
                          width: cell.column.width,
                          minWidth: cell.column.minWidth,
                          maxWidth: cell.column.maxWidth,
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {(data?.length <= 0 || !data) && !loading ? (
            <Card my="xs">
              <Text align="center">{t("empty_data")}</Text>
            </Card>
          ) : null}
          {loading ? (
            <>
              {data?.length <= 0 || !data ? (
                <Card my="xs">
                  <Flex align="center" justify="center" direction="column">
                    <Loader size="xs" />
                    <Text size="sm" align="center" italic>
                      {t("loading")}
                    </Text>
                  </Flex>
                </Card>
              ) : (
                <Flex
                  w="100%"
                  h="100%"
                  pos="absolute"
                  top={0}
                  left={0}
                  justify="center"
                  align="center"
                >
                  <Overlay blur={2} opacity={0.1} center bg="none" zIndex={1}>
                    <SimpleLoader />
                  </Overlay>
                </Flex>
              )}
            </>
          ) : null}
        </ScrollArea.Autosize>
      </Box>
      {disablePagination ? null : (
        <Flex justify="space-between" align="center" gap="sm">
          <Box>
            <Pagination
              disabled={loading}
              value={page}
              total={Math.ceil(total / limit)}
              onChange={(val) => onChangePagination(+val, limit)}
            />
          </Box>
          <Select
            data={LIMIT_OPTION.map((val) => ({
              value: String(val),
              label: `${val} items`,
            }))}
            withinPortal
            allowDeselect={false}
            disabled={loading}
            defaultValue={String(limit)}
            value={String(limit)}
            onChange={(val) => onChangePagination(1, val ? +val : 10)}
          />
        </Flex>
      )}
    </>
  );
}

export default TableStyled;

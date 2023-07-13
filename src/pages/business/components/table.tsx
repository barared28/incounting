import { Button, Flex, Text, Box } from "@mantine/core";
import Table from "@/components/table";
import { useHandleSelectBusiness } from "../hooks";
import { IResponseDataBusiness, IBusinessResponse } from "@/services/business";
import { ColumnTable } from "@/types";
import { IconBuildingStore } from "@tabler/icons-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface IProps {
  data: IBusinessResponse | undefined;
  onChangePagination: (page: number, limit: number) => void;
  page: number;
  limit: number;
  loading: boolean;
  isRefetching: boolean;
  selectedId?: number;
}

const TableBusiness = (props: IProps) => {
  const {
    data,
    onChangePagination,
    page,
    limit,
    loading,
    isRefetching,
    selectedId,
  } = props;
  const navigate = useNavigate();
  const { handleSelect } = useHandleSelectBusiness();
  const columns: ColumnTable<IResponseDataBusiness>[] = [
    {
      accessor: "name",
      Header: "Business",
      Cell: (props: any) => (
        <Flex align="center" gap="xs">
          <IconBuildingStore />
          <Box>
            <Text weight={500}>{props?.value}</Text>
            <Flex gap={6}>
              <Text size={11}>
                {`Type: ${props?.row?.original?.type || "-"}`}
              </Text>
              <Text size={11}>|</Text>
              <Text size={11}>
                {`Category: ${props?.row?.original?.category || "-"}`}
              </Text>
              <Text size={11}>|</Text>
              <Text size={11}>
                {`Created At: ${
                  props?.row?.original?.created_at
                    ? moment(props?.row?.original?.created_at).format(
                        "DD MMM YYYY"
                      )
                    : "-"
                }`}
              </Text>
            </Flex>
          </Box>
        </Flex>
      ),
    },
    {
      accessor: "",
      Header: "Action",
      Cell: (props: any) => {
        return (
          <Button
            onClick={() =>
              handleSelect({ business_id: props?.row?.original?.id }, () =>
                navigate("/dashboard")
              )
            }
            variant="gradient"
            size="xs"
            disabled={selectedId === props?.row?.original?.id}
            data-cy={
              selectedId === props?.row?.original?.id
                ? "btn-business-disabled"
                : "btn-business"
            }
          >
            {selectedId === props?.row?.original?.id ? "Selected" : "Select"}
          </Button>
        );
      },
      width: 1,
    },
  ];
  return (
    <Table
      columns={columns}
      data={data?.data || []}
      total={data?.pagination?.total}
      page={page}
      limit={limit}
      onChangePagination={onChangePagination}
      verticalSpacing="sm"
      loading={loading}
      isRefetching={isRefetching}
    />
  );
};

export default TableBusiness;

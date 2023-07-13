import { Modal, ScrollArea } from "@mantine/core";
import { TTransactionType } from "..";
import Table from "@/components/table";
import useDataTransactionDetails from "@/pages/daily-sales-report/hooks/use-data-transaction-details";
import { ColumnTable } from "@/types";
import { formatIDR } from "@/utils/currency";
import usePagination from "@/hooks/usePagination";
import { useMemo } from "react";

interface IProps {
  type: TTransactionType;
  show: boolean;
  handleClose: () => void;
  selectedId: number;
  title: string;
}

const DetailTransaction = (props: IProps) => {
  const { type, show, handleClose, selectedId, title } = props;
  if (!show || !type || !selectedId) return null;
  const { limit, onChangePagination, page } = usePagination({
    limit: 10,
    page: 1,
  });
  const params = useMemo(() => ({ limit, page }), [limit, page]);
  const { data, isLoading, isRefetching } = useDataTransactionDetails(
    type,
    selectedId,
    params
  );
  const columnsRoom: ColumnTable<any>[] = [
    {
      accessor: "no",
      Header: "#",
    },
    {
      accessor: "customer_name",
      Header: "Customer Name",
    },
    {
      accessor: "room_number",
      Header: "Room Number",
    },
    {
      accessor: "room_rev",
      Header: "Room Revenue",
      Cell: ({ value }) => formatIDR(value),
    },
    {
      accessor: "remarks",
      Header: "Remarks",
    },
    {
      accessor: "source_booking",
      Header: "Source Booking",
    },
  ];
  const columnsFnb: ColumnTable<any>[] = [
    {
      accessor: "no",
      Header: "#",
    },
    {
      accessor: "customer_name",
      Header: "Customer Name",
    },
    {
      accessor: "item",
      Header: "Item",
    },
    {
      accessor: "price",
      Header: "Price",
      Cell: ({ value }) => formatIDR(value) || "-",
    },
    {
      accessor: "quantity",
      Header: "Quantity",
    },
    {
      accessor: "tax",
      Header: "Tax",
      Cell: ({ value }) => formatIDR(value) || "-",
    },
    {
      accessor: "discount",
      Header: "Discount",
      Cell: ({ value }) => formatIDR(value) || "-",
    },
    {
      accessor: "total",
      Header: "Total",
      Cell: ({ value }) => formatIDR(value) || "-",
    },
  ];
  const columnsInRoomService: ColumnTable<any>[] = [
    {
      accessor: "no",
      Header: "#",
    },
    {
      accessor: "customer_name",
      Header: "Customer Name",
    },
    {
      accessor: "room_number",
      Header: "Room Number",
    },
    {
      accessor: "item",
      Header: "Item",
    },
    {
      accessor: "price",
      Header: "Price",
      Cell: ({ value }) => formatIDR(value) || "-",
    },
    {
      accessor: "quantity",
      Header: "Quantity",
    },
    {
      accessor: "tax",
      Header: "Tax",
      Cell: ({ value }) => formatIDR(value) || "-",
    },
    {
      accessor: "discount",
      Header: "Discount",
      Cell: ({ value }) => formatIDR(value) || "-",
    },
    {
      accessor: "total",
      Header: "Total",
      Cell: ({ value }) => formatIDR(value) || "-",
    },
  ];
  const columnsOther: ColumnTable<any>[] = [
    {
      accessor: "no",
      Header: "#",
    },
    {
      accessor: "customer_name",
      Header: "Customer Name",
    },
    {
      accessor: "product_name",
      Header: "Product Name",
    },
    {
      accessor: "revenue",
      Header: "Revenue",
      Cell: ({ value }) => formatIDR(value) || "-",
    },
    {
      accessor: "remarks",
      Header: "Remarks",
    },
  ];
  const columns = useMemo(() => {
    switch (type) {
      case "room":
        return columnsRoom;
      case "food_beverage":
        return columnsFnb;
      case "in_room_service":
        return columnsInRoomService;
      case "other":
        return columnsOther;
      default:
        return [];
    }
  }, [type]);
  return (
    <Modal
      opened={show}
      onClose={handleClose}
      closeOnClickOutside={false}
      size="xl"
      title={title}
    >
      <ScrollArea.Autosize mah="80vh" type="never">
        <Table
          columns={columns}
          data={data?.data || []}
          withBorder
          loading={isLoading}
          page={page}
          isRefetching={isRefetching}
          limit={limit}
          total={data?.pagination?.total || 0}
          onChangePagination={onChangePagination}
        />
      </ScrollArea.Autosize>
    </Modal>
  );
};

export default DetailTransaction;

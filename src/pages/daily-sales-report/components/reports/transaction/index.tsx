import Table from "@/components/table";
import useCustomTransaction from "@/pages/daily-sales-report/hooks/use-custom-transaction";
import useDataTransaction from "@/pages/daily-sales-report/hooks/use-data-transaction";
import { formatIDR } from "@/utils/currency";
import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import DetailTransaction from "./details";
import { CellProps } from "react-table";

export type TTransactionType =
  | "room"
  | "food_beverage"
  | "in_room_service"
  | "other";
interface IProps {
  type: TTransactionType | "";
  show: boolean;
  handleCloseModal: () => void;
  date: string;
}

const TransactionModal = (props: IProps) => {
  const { type, show, handleCloseModal, date } = props;
  if (!show || !type) return null;
  const { data, isLoading, isRefetching } = useDataTransaction(type, date);
  const {
    title,
    openedDetails,
    openDetails,
    closeDetails,
    idDetails,
    titleDetails,
  } = useCustomTransaction({ type });
  return (
    <>
      <Modal
        opened={show && !openedDetails}
        title={title}
        size="xl"
        onClose={handleCloseModal}
        closeOnClickOutside={false}
      >
        <Table
          columns={[
            {
              accessor: "no",
              Header: "#",
            },
            {
              accessor: "category_name",
              Header: "Name",
            },
            {
              accessor: "amount",
              Header: "Amount",
              Cell: ({ value }) => formatIDR(value),
            },
            {
              accessor: "detail",
              Header: "Detail",
              Cell: ({ row }: CellProps<any>) => (
                <Tooltip label="View Detail">
                  <ActionIcon
                    size="sm"
                    color="blue"
                    onClick={() =>
                      openDetails(
                        row?.original?.category_id || 0,
                        row?.original?.category_name || ""
                      )
                    }
                  >
                    <IconEye />
                  </ActionIcon>
                </Tooltip>
              ),
            },
          ]}
          data={data?.data || []}
          verticalSpacing="sm"
          additionalRowsComponent={
            data?.total ? (
              <>
                <tr>
                  <td colSpan={2}>Total</td>
                  <td>{formatIDR(data?.total || 0)}</td>
                  <td></td>
                </tr>
              </>
            ) : null
          }
          withBorder
          loading={isLoading}
          isRefetching={isRefetching}
        />
      </Modal>
      <DetailTransaction
        handleClose={closeDetails}
        show={openedDetails}
        type={type}
        selectedId={idDetails}
        title={titleDetails}
      />
    </>
  );
};

export default TransactionModal;

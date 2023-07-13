import ExportButton from "@/components/button/export";
import PageDialog from "@/components/page-dialog";
import { Button, Flex, Table, useMantineTheme } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import useDataDailySalesReport from "../../hooks/use-data";
import { IParamsDailySalesReport } from "@/services/daily-sales-report";
import RoomStatistic from "./room-statistic";
import RoomRevenue from "./room-revenue";
import AverageRate from "./average-rate";
import DailySalesReport from "./daily-sales-report";
import TransactionModal, { TTransactionType } from "./transaction";
import { useState } from "react";

interface IProps {
  show: boolean;
  onClose: () => void;
  params: IParamsDailySalesReport | null;
  reports: string[];
}

const ReportsPageDialog = (props: IProps) => {
  const { show, onClose, params, reports } = props;
  if (!show || !params) return null;
  const theme = useMantineTheme();
  const { data } = useDataDailySalesReport(params);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState<TTransactionType | "">("");

  const styleColumnSection = {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.blue[9]
        : theme.colors.blue[2],
  };

  const handleShowModal = (type: TTransactionType) => {
    setType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setType("");
    setShowModal(false);
  };

  return (
    <PageDialog show={show} onCancel={onClose} title="Reports" type="view">
      <Flex w="100%" justify="end">
        <Flex gap="md">
          <Button leftIcon={<IconMail />}>Send Email</Button>
          <ExportButton />
        </Flex>
      </Flex>
      <Table striped highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th>#</th>
            <th colSpan={3}>{`Daily ${params?.date}`}</th>
            {params?.with_month && (
              <th colSpan={3}>{`Month To Date until ${params?.date}`}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => {
            if (report === "room_statistic") {
              return (
                <RoomStatistic
                  key={index}
                  data={data}
                  styleColumnSection={styleColumnSection}
                  withMonth={params?.with_month}
                />
              );
            }
            if (report === "room_revenue") {
              return (
                <RoomRevenue
                  key={index}
                  data={data}
                  styleColumnSection={styleColumnSection}
                  withMonth={params?.with_month}
                />
              );
            }
            if (report === "average_rate") {
              return (
                <AverageRate
                  key={index}
                  data={data}
                  styleColumnSection={styleColumnSection}
                  withMonth={params?.with_month}
                />
              );
            }
            if (report === "daily_sales_report") {
              return (
                <DailySalesReport
                  key={index}
                  data={data}
                  styleColumnSection={styleColumnSection}
                  withMonth={params?.with_month}
                  handleShowModal={handleShowModal}
                />
              );
            }
            return null;
          })}
        </tbody>
      </Table>
      <TransactionModal
        show={showModal}
        type={type}
        handleCloseModal={handleCloseModal}
        date={params?.date}
      />
    </PageDialog>
  );
};

export default ReportsPageDialog;

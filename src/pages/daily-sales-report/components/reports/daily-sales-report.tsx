import { IResponseDailySalesReport } from "@/services/daily-sales-report";
import { ActionIcon, Center, Flex, Text, Tooltip } from "@mantine/core";
import { IconEye, IconReportMoney } from "@tabler/icons-react";
import { handleNullValue } from "../../utils";
import { TTransactionType } from "./transaction";

interface IProps {
  data: IResponseDailySalesReport | null | undefined;
  styleColumnSection: React.CSSProperties;
  withMonth: boolean;
  handleShowModal: (type: TTransactionType) => void;
}

const ButtonDetail = (props: { onClick: () => void }) => {
  const { onClick } = props;
  return (
    <Center>
      <Tooltip label="View Detail">
        <ActionIcon color="blue" size="sm" onClick={onClick}>
          <IconEye />
        </ActionIcon>
      </Tooltip>
    </Center>
  );
};

const DailySalesReport = (props: IProps) => {
  const { data, styleColumnSection, withMonth, handleShowModal } = props;
  return (
    <>
      {/* Daily Sales Report field */}
      <tr style={styleColumnSection}>
        <td colSpan={withMonth ? 7 : 4}>
          <Flex gap="md" align="center">
            <IconReportMoney />
            <Text weight={600}>Daily Sales Report</Text>
          </Flex>
        </td>
      </tr>
      {/* Rooms field */}
      <tr>
        <td>Rooms</td>
        <td colSpan={3}>
          {handleNullValue(
            data?.daily?.daily_sales_report?.room_revenue,
            "currency"
          )}
        </td>
        {withMonth && (
          <>
            <td colSpan={2}>
              {handleNullValue(
                data?.month_to_date?.daily_sales_report?.room_revenue,
                "currency"
              )}
            </td>
            <td>
              <ButtonDetail onClick={() => handleShowModal("room")} />
            </td>
          </>
        )}
      </tr>
      {/* Food & Beverage field */}
      <tr>
        <td>Food & Beverage</td>
        <td colSpan={3}>
          {handleNullValue(
            data?.daily?.daily_sales_report?.food_revenue,
            "currency"
          )}
        </td>
        {withMonth && (
          <>
            <td colSpan={2}>
              {handleNullValue(
                data?.month_to_date?.daily_sales_report?.food_revenue,
                "currency"
              )}
            </td>
            <td>
              <ButtonDetail onClick={() => handleShowModal("food_beverage")} />
            </td>
          </>
        )}
      </tr>
      {/* In Room Dining & Service field */}
      <tr>
        <td>In Room Dining & Service</td>
        <td colSpan={3}>
          {handleNullValue(
            data?.daily?.daily_sales_report?.room_service_revenue,
            "currency"
          )}
        </td>
        {withMonth && (
          <>
            <td colSpan={2}>
              {handleNullValue(
                data?.month_to_date?.daily_sales_report?.room_service_revenue,
                "currency"
              )}
            </td>
            <td>
              <ButtonDetail
                onClick={() => handleShowModal("in_room_service")}
              />
            </td>
          </>
        )}
      </tr>
      {/* Other Income field */}
      <tr>
        <td>Other Income</td>
        <td colSpan={3}>
          {handleNullValue(
            data?.daily?.daily_sales_report?.other_income,
            "currency"
          )}
        </td>
        {withMonth && (
          <>
            <td colSpan={2}>
              {handleNullValue(
                data?.month_to_date?.daily_sales_report?.other_income,
                "currency"
              )}
            </td>
            <td>
              <ButtonDetail onClick={() => handleShowModal("other")} />
            </td>
          </>
        )}
      </tr>
      {/* Total Gross Revenue field */}
      <tr>
        <td>Total Gross Revenue</td>
        <td colSpan={3}>
          {handleNullValue(
            data?.daily?.daily_sales_report?.total_gross_revenue,
            "currency"
          )}
        </td>
        {withMonth && (
          <td colSpan={3}>
            {handleNullValue(
              data?.month_to_date?.daily_sales_report?.total_gross_revenue,
              "currency"
            )}
          </td>
        )}
      </tr>
      {/* Total Nett Revenue field */}
      <tr>
        <td>Total Nett Revenue</td>
        <td colSpan={3}>
          {handleNullValue(
            data?.daily?.daily_sales_report?.total_net_revenue,
            "currency"
          )}
        </td>
        {withMonth && (
          <td colSpan={3}>
            {handleNullValue(
              data?.month_to_date?.daily_sales_report?.total_net_revenue,
              "currency"
            )}
          </td>
        )}
      </tr>
    </>
  );
};

export default DailySalesReport;

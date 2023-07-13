import { IResponseDailySalesReport } from "@/services/daily-sales-report";
import { Flex, Text } from "@mantine/core";
import { IconBed } from "@tabler/icons-react";
import { handleNullValue } from "../../utils";

interface IProps {
  data: IResponseDailySalesReport | null | undefined;
  styleColumnSection: React.CSSProperties;
  withMonth: boolean;
}

const RoomRevenue = (props: IProps) => {
  const { data, styleColumnSection, withMonth } = props;
  return (
    <>
      {/* Room Revenue section */}
      <tr style={styleColumnSection}>
        <td colSpan={withMonth ? 7 : 4}>
          <Flex gap="md" align="center">
            <IconBed />
            <Text weight={600}>Room Revenue</Text>
          </Flex>
        </td>
      </tr>
      {/* Room Revenue field */}
      <tr>
        <td>Room Revenue</td>
        <td colSpan={2}>
          {handleNullValue(data?.daily?.room_revenue?.room_revenue, "currency")}
        </td>
        <td>
          {handleNullValue(
            data?.daily?.room_revenue?.room_revenue_rate,
            "percent"
          )}
        </td>
        {withMonth && (
          <td colSpan={3}>
            {handleNullValue(
              data?.month_to_date?.room_revenue?.room_revenue,
              "currency"
            )}
          </td>
        )}
      </tr>
      {/* OTA Commission field */}
      <tr>
        <td>OTA Commission</td>
        <td colSpan={2}>
          {handleNullValue(
            data?.daily?.room_revenue?.ota_commission,
            "currency"
          )}
        </td>
        <td>
          {handleNullValue(
            data?.daily?.room_revenue?.ota_commission_rate,
            "percent"
          )}
        </td>
        {withMonth && (
          <td colSpan={3}>
            {handleNullValue(
              data?.month_to_date?.room_revenue?.ota_commission,
              "currency"
            )}
          </td>
        )}
      </tr>
      {/* Gross Room Revenue field */}
      <tr>
        <td>Gross Room Revenue</td>
        <td colSpan={2}>
          {handleNullValue(
            data?.daily?.room_revenue?.gross_revenue,
            "currency"
          )}
        </td>
        <td>
          {handleNullValue(
            data?.daily?.room_revenue?.gross_revenue_rate,
            "percent"
          )}
        </td>
        {withMonth && (
          <td colSpan={3}>
            {handleNullValue(
              data?.month_to_date?.room_revenue?.gross_revenue,
              "currency"
            )}
          </td>
        )}
      </tr>
      {/* Total Nett Revenue field */}
      <tr>
        <td>Total Nett Revenue</td>
        <td colSpan={2}>
          {handleNullValue(
            data?.daily?.room_revenue?.total_net_revenue,
            "currency"
          )}
        </td>
        <td>
          {handleNullValue(
            data?.daily?.room_revenue?.total_net_revenue_rate,
            "percent"
          )}
        </td>
        {withMonth && (
          <td colSpan={3}>
            {handleNullValue(
              data?.month_to_date?.room_revenue?.total_net_revenue,
              "currency"
            )}
          </td>
        )}
      </tr>
    </>
  );
};

export default RoomRevenue;

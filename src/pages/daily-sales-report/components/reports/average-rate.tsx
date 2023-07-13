import { IResponseDailySalesReport } from "@/services/daily-sales-report";
import { Flex, Text } from "@mantine/core";
import { IconDatabaseDollar } from "@tabler/icons-react";
import { handleNullValue } from "../../utils";

interface IProps {
  data: IResponseDailySalesReport | null | undefined;
  styleColumnSection: React.CSSProperties;
  withMonth: boolean;
}

const AverageRate = (props: IProps) => {
  const { data, styleColumnSection, withMonth } = props;
  return (
    <>
      {/* Average Rate section */}
      <tr style={styleColumnSection}>
        <td colSpan={withMonth ? 7 : 4}>
          <Flex gap="md" align="center">
            <IconDatabaseDollar />
            <Text weight={600}>Average Rate</Text>
          </Flex>
        </td>
      </tr>
      {/* Average Daily Rate field */}
      <tr>
        <td>Average Daily Rate</td>
        <td colSpan={3}>
          {handleNullValue(
            data?.daily?.average_rate?.average_daily_rate,
            "currency"
          )}
        </td>
        {withMonth && (
          <td colSpan={3}>
            {handleNullValue(
              data?.month_to_date?.average_rate?.average_daily_rate,
              "currency"
            )}
          </td>
        )}
      </tr>
      {/* Average Room Rate field */}
      <tr>
        <td>Average Room Rate</td>
        <td colSpan={3}>
          {handleNullValue(
            data?.daily?.average_rate?.average_room_rate,
            "currency"
          )}
        </td>
        {withMonth && (
          <td colSpan={3}>
            {handleNullValue(
              data?.month_to_date?.average_rate?.average_room_rate,
              "currency"
            )}
          </td>
        )}
      </tr>
    </>
  );
};

export default AverageRate;

import { IResponseDailySalesReport } from "@/services/daily-sales-report";
import { Flex, Text } from "@mantine/core";
import { IconBedFilled } from "@tabler/icons-react";
import { handleNullValue } from "../../utils";

interface IProps {
  data: IResponseDailySalesReport | null | undefined;
  styleColumnSection: React.CSSProperties;
  withMonth: boolean;
}

const RoomStatistic = (props: IProps) => {
  const { data, styleColumnSection, withMonth } = props;
  return (
    <>
      {/* room statistic section */}
      <tr style={styleColumnSection}>
        <td colSpan={withMonth ? 7 : 4}>
          <Flex gap="md" align="center">
            <IconBedFilled />
            <Text weight={600}>Room Statistic</Text>
          </Flex>
        </td>
      </tr>
      {/* room available field */}
      <tr>
        <td>Room Available</td>
        <td>{handleNullValue(data?.daily?.room_statistic?.room_available)}</td>
        <td>
          {handleNullValue(
            data?.daily?.room_statistic?.room_available_rate,
            "percent"
          )}
        </td>
        <td></td>
        {withMonth && (
          <>
            <td>
              {handleNullValue(
                data?.month_to_date?.room_statistic?.room_available
              )}
            </td>
            <td>
              {handleNullValue(
                data?.month_to_date?.room_statistic?.room_available_rate,
                "percent"
              )}
            </td>
            <td></td>
          </>
        )}
      </tr>
      {/* Out Of Order field */}
      <tr>
        <td>Out Of Order</td>
        <td>{handleNullValue(data?.daily?.room_statistic?.out_of_order)}</td>
        <td>
          {handleNullValue(
            data?.daily?.room_statistic?.out_of_order_rate,
            "percent"
          )}
        </td>
        <td></td>
        {withMonth && (
          <>
            <td>
              {handleNullValue(
                data?.month_to_date?.room_statistic?.out_of_order
              )}
            </td>
            <td>
              {handleNullValue(
                data?.month_to_date?.room_statistic?.out_of_order_rate,
                "percent"
              )}
            </td>
            <td></td>
          </>
        )}
      </tr>
      {/* House Use field */}
      <tr>
        <td>House Use</td>
        <td>{handleNullValue(data?.daily?.room_statistic?.house_use)}</td>
        <td>
          {handleNullValue(
            data?.daily?.room_statistic?.house_use_rate,
            "percent"
          )}
        </td>
        <td></td>
        {withMonth && (
          <>
            <td>
              {handleNullValue(data?.month_to_date?.room_statistic?.house_use)}
            </td>
            <td>
              {handleNullValue(
                data?.month_to_date?.room_statistic?.house_use_rate,
                "percent"
              )}
            </td>
            <td></td>
          </>
        )}
      </tr>
      {/* Block Room field */}
      <tr>
        <td>Block Room</td>
        <td>{handleNullValue(data?.daily?.room_statistic?.block_room)}</td>
        <td>
          {handleNullValue(
            data?.daily?.room_statistic?.block_room_rate,
            "percent"
          )}
        </td>
        <td></td>
        {withMonth && (
          <>
            <td>
              {handleNullValue(data?.month_to_date?.room_statistic?.block_room)}
            </td>
            <td>
              {handleNullValue(
                data?.month_to_date?.room_statistic?.block_room_rate,
                "percent"
              )}
            </td>
            <td></td>
          </>
        )}
      </tr>
      {/* Saleable Room field */}
      <tr>
        <td>Saleable</td>
        <td>{handleNullValue(data?.daily?.room_statistic?.room_available)}</td>
        <td>
          {handleNullValue(
            data?.daily?.room_statistic?.room_available_rate,
            "percent"
          )}
        </td>
        <td></td>
        {withMonth && (
          <>
            <td>
              {handleNullValue(
                data?.month_to_date?.room_statistic?.room_available
              )}
            </td>
            <td>
              {handleNullValue(
                data?.month_to_date?.room_statistic?.room_available_rate,
                "percent"
              )}
            </td>
            <td></td>
          </>
        )}
      </tr>
      {/* Room Sold field */}
      <tr>
        <td>Room Sold</td>
        <td>{handleNullValue(data?.daily?.room_statistic?.room_sold)}</td>
        <td>
          {handleNullValue(
            data?.daily?.room_statistic?.room_sold_rate,
            "percent"
          )}
        </td>
        <td>
          {handleNullValue(
            data?.daily?.room_statistic?.room_sold_amount,
            "currency"
          )}
        </td>
        {withMonth && (
          <>
            <td>
              {handleNullValue(data?.month_to_date?.room_statistic?.room_sold)}
            </td>
            <td>
              {handleNullValue(
                data?.month_to_date?.room_statistic?.room_sold_rate,
                "percent"
              )}
            </td>
            <td>
              {handleNullValue(
                data?.month_to_date?.room_statistic?.room_sold_amount,
                "currency"
              )}
            </td>
          </>
        )}
      </tr>
      {/* Room Occupied field */}
      <tr>
        <td>Room Occupied</td>
        <td>{handleNullValue(data?.daily?.room_statistic?.room_occupied)}</td>
        <td>
          {handleNullValue(
            data?.daily?.room_statistic?.room_occupied_rate,
            "percent"
          )}
        </td>
        <td>
          {handleNullValue(
            data?.daily?.room_statistic?.total_amount,
            "currency"
          )}
        </td>
        {withMonth && (
          <>
            <td>
              {handleNullValue(
                data?.month_to_date?.room_statistic?.room_occupied
              )}
            </td>
            <td>
              {handleNullValue(
                data?.month_to_date?.room_statistic?.room_occupied_rate,
                "percent"
              )}
            </td>
            <td>
              {handleNullValue(
                data?.month_to_date?.room_statistic?.total_amount,
                "currency"
              )}
            </td>
          </>
        )}
      </tr>
    </>
  );
};

export default RoomStatistic;

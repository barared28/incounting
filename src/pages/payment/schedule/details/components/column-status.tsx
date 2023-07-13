import { Badge } from "@mantine/core";
import { useMemo } from "react";
import { EStatusPaymentSchedule } from "../../enum";

interface IProps {
  data: any;
}

const ColumnStatus = (props: IProps) => {
  const { data } = props;
  const [color, text] = useMemo(() => {
    let color = "";
    let text = "";
    switch (+data) {
      case EStatusPaymentSchedule.UNPAID:
        color = "red";
        text = "Unpaid";
        break;
      case EStatusPaymentSchedule.PAID:
        color = "green";
        text = "Paid";
        break;
      case EStatusPaymentSchedule.POSTPONE:
        color = "yellow";
        text = "Postpone";
        break;
      case EStatusPaymentSchedule.UNBILL:
        color = "orange";
        text = "Unbill";
        break;
      default:
        color = "gray";
        text = "-";
    }
    return [color, text];
  }, [data]);
  return (
    <Badge color={color} variant="light">
      {text}
    </Badge>
  );
};

export default ColumnStatus;

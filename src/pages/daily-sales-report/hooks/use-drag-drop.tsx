import { IconDatabaseDollar, IconReportMoney } from "@tabler/icons-react";
import { IconBed } from "@tabler/icons-react";
import { IconBedFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";

const DATA_LIST = [
  {
    title: "Room Statistic",
    icon: <IconBedFilled size={18} />,
    key: "room_statistic",
  },
  {
    title: "Room Revenue",
    icon: <IconBed size={18} />,
    key: "room_revenue",
  },
  {
    title: "Average Rate",
    icon: <IconDatabaseDollar size={18} />,
    key: "average_rate",
  },
  {
    title: "Daily Sales Report",
    icon: <IconReportMoney size={18} />,
    key: "daily_sales_report",
  },
];

const useDragDrop = (reports: any) => {
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    const newList = DATA_LIST.filter((item) => reports.includes(item.key));
    if (newList?.length < list?.length) {
      const res = list.filter((item: any) => reports.includes(item.key));
      setList(res);
      return;
    } else {
      const existing = list.map((item: any) => item.key);
      const newKey = newList.filter(
        (item: any) => !existing.includes(item.key)
      );
      setList([...list, ...newKey]);
    }
  }, [reports]);

  const handleChange = (val: DropResult) => {
    if (!val.destination || !val.source) return;
    const newList = [...list];
    const [removed] = newList.splice(val.source.index, 1);
    newList.splice(val.destination!.index, 0, removed);
    setList(newList);
  };

  return { list, handleChange };
};

export default useDragDrop;

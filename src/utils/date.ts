import moment from "moment";

export const getNextDate = (
  date: number,
  next?: number,
  startMonth?: string,
  format?: string
) => {
  const now = moment();
  const currentMonth = now.month();
  const currentYear = now.year();
  const selectedDate = startMonth
    ? moment(`${date}-${startMonth}`, "DD-MM-YYYY")
    : moment(`${date}-${currentMonth + 1}-${currentYear}`, "DD-MM-YYYY");

  if (selectedDate.isBefore(now, "day")) {
    // If the selected date is in the past, add one month.
    return selectedDate
      .add(next ? next + 1 : 1, "month")
      .format(format || "DD-MM-YYYY");
  } else {
    // Otherwise, add the number of months specified by next.
    return selectedDate
      .add(next ? next : 0, "month")
      .format(format || "DD-MM-YYYY");
  }
};

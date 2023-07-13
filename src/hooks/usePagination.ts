import { useState } from "react";

const usePagination = ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const [pageState, setPage] = useState(page);
  const [limitState, setLimit] = useState(limit);

  const onChangePagination = (pageNew: number, limitNew: number) => {
    setPage(pageNew);
    setLimit(limitNew);
  };

  return {
    page: pageState,
    setPage,
    limit: limitState,
    setLimit,
    onChangePagination,
  };
};

export default usePagination;

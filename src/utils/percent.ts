const formatPercent = (value: number, precision = 2) => {
  return `${value.toLocaleString("id-ID")} %`;
};

export default formatPercent;

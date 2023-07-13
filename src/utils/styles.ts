export const caculateVwPx = (px: number) => {
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth;
  const vwToPixels = viewportWidth / 100;
  const result = vwToPixels * 100 - px;
  return result;
};

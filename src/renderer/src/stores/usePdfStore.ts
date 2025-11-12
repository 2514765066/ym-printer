export const usePdfStore = defineStore("pdf", () => {
  //页数
  const pageCount = ref(0);

  //dpi
  const dpi = 2;

  //缩放倍率
  const scale = ref(100 / dpi);

  //增大倍率
  const addScale = () => {
    scale.value = Math.min(scale.value + 10 / dpi, 500 / dpi);
  };

  //减小倍率
  const subScale = () => {
    scale.value = Math.max(scale.value - 10 / dpi, 10 / dpi);
  };

  return {
    dpi,
    pageCount,
    scale,
    addScale,
    subScale,
  };
});

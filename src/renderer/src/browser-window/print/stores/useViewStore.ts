import useStoreRef from "@/hooks/useStoreRef";

export const useViewStore = defineStore("print-view", () => {
  //暗色主题
  const dark = useStoreRef(false, "dark");

  //页数
  const pageCount = ref(0);

  //dpi
  const dpi = 2;

  //缩放倍率
  const scale = useStoreRef(100 / dpi, "scale");

  //增大倍率
  const addScale = () => {
    scale.value = Math.min(scale.value + 10 / dpi, 500 / dpi);
  };

  //减小倍率
  const subScale = () => {
    scale.value = Math.max(scale.value - 10 / dpi, 10 / dpi);
  };

  //切换主题
  const toggleTheme = () => {
    dark.value = !dark.value;
  };

  return {
    dark,
    dpi,
    pageCount,
    scale,
    addScale,
    subScale,
    toggleTheme,
  };
});

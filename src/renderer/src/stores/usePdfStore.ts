import { useStorage } from "@vueuse/core";

export const usePdfStore = defineStore("pdf", () => {
  //暗色主题
  const theme = useStorage("theme", "light");

  //dpi
  const dpi = 2;

  //缩放倍率
  const scale = useStorage("scale", 100 / dpi);

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
    theme.value = theme.value == "dark" ? "light" : "dark";
  };

  return {
    theme,
    dpi,
    scale,
    addScale,
    subScale,
    toggleTheme,
  };
});

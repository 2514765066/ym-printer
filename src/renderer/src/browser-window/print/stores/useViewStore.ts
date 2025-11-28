export const useViewStore = defineStore("print-view", () => {
  //暗色主题
  const dark = ref(false);

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

  //切换主题
  const toggleTheme = () => {
    dark.value = !dark.value;
  };

  //初始化
  const init = () => {
    const scaleResult = localStorage.getItem("scale");
    const darkResult = localStorage.getItem("dark");

    if (scaleResult) {
      scale.value = Number(scaleResult);
    }

    if (darkResult) {
      dark.value = Boolean(darkResult);
    }

    watch(scale, value => {
      localStorage.setItem("scale", String(value));
    });

    watch(dark, value => {
      localStorage.setItem("dark", String(value));
    });
  };

  init();

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

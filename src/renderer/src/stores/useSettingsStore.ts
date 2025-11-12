export const useSettingsStore = defineStore("settings", () => {
  const data = ref({
    //单面价格
    simplexPrice: 0.2,

    //双面价格
    duplexPrice: 0.25,

    //pdf主题
    pdfTheme: "light",
  });

  //切换主题
  const togglePdfTheme = () => {
    data.value.pdfTheme == "dark"
      ? (data.value.pdfTheme = "light")
      : (data.value.pdfTheme = "dark");
  };

  const init = () => {
    const res = localStorage.getItem("settings");

    if (res) {
      data.value = JSON.parse(res);
    }

    watch(
      data,
      val => {
        localStorage.setItem("settings", JSON.stringify(val));
      },
      {
        deep: true,
      }
    );
  };

  init();

  return {
    data,
    togglePdfTheme,
  };
});

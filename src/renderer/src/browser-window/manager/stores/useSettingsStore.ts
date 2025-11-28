export const useSettingsStore = defineStore("manager-settings", () => {
  const data = ref({
    //单面价格
    simplexPrice: 0.2,

    //双面价格
    duplexPrice: 0.25,
  });

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
  };
});

import { appName } from "@/service/info";

export const useConfigStore = defineStore("manager-config", () => {
  const config = ref({
    //单面价格
    simplexPrice: 0.2,

    //双面价格
    duplexPrice: 0.25,

    //仓库
    selectedRepo: {
      label: "Gitee",
      url: `https://gitee.com/yxingyus/${appName}`,
      updateUrl: `https://gitee.com/api/v5/repos/yxingyus/${appName}/releases/latest`,
    },
  });

  //设置仓库
  const setRepo = (value: typeof config.value.selectedRepo) => {
    config.value.selectedRepo = value;
  };

  const init = () => {
    const res = localStorage.getItem("settings");

    if (res) {
      config.value = JSON.parse(res);
    }

    watch(
      config,
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
    config,
    setRepo,
  };
});

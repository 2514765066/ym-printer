import { useStorage } from "@vueuse/core";

//创建配置
const createConfig = () => {
  return {
    //单面价格
    blackSimplexPrice: 0.2,

    //双面价格
    blackDuplexPrice: 0.25,

    //单面价格
    colorSimplexPrice: 0.3,

    //双面价格
    colorDuplexPrice: 0.35,

    //自动更新
    autoUpdate: true,

    //选中的仓库
    repo: "gitee",
  };
};

export const useConfigStore = defineStore("config", () => {
  const config = useStorage("settings", createConfig(), localStorage, {
    mergeDefaults: true,
  });

  //重置
  const resetConfig = () => {
    config.value = createConfig();
  };

  return {
    config,
    resetConfig,
  };
});

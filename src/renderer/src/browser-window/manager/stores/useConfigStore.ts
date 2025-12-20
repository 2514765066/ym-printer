import useStoreRef from "@/hooks/useStoreRef";
import { appName } from "@/services/info";

//创建配置
const createConfig = () => {
  return {
    //单面价格
    simplexPrice: 0.2,

    //双面价格
    duplexPrice: 0.25,

    //自动更新
    autoUpdate: true,

    //选中的仓库
    selectedRepo: {
      label: "Gitee",
      url: `https://gitee.com/yxingyus/${appName}`,
      updateUrl: `https://gitee.com/api/v5/repos/yxingyus/${appName}/releases/latest`,
    },
  };
};

export const useConfigStore = defineStore("manager-config", () => {
  const config = useStoreRef(createConfig(), "settings");

  //切换自动更新
  const toggleAutoUpdate = () => {
    config.value.autoUpdate = !config.value.autoUpdate;
  };

  //重置
  const resetConfig = () => {
    config.value = createConfig();
  };

  return {
    config,
    toggleAutoUpdate,
    resetConfig,
  };
});

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

type Config = ReturnType<typeof createConfig>;

//初始化配置
const initConfig = () => {
  try {
    return JSON.parse(localStorage.getItem("settings") ?? "");
  } catch {
    return createConfig();
  }
};

export const useConfigStore = defineStore("manager-config", () => {
  const config = ref<Config>(initConfig());

  //切换自动更新
  const toggleAutoUpdate = () => {
    config.value.autoUpdate = !config.value.autoUpdate;
  };

  //重置
  const resetConfig = () => {
    config.value = createConfig();
  };

  //自动保存配置
  watch(
    config,
    val => {
      localStorage.setItem("settings", JSON.stringify(val));
    },
    {
      deep: true,
    }
  );

  return {
    config,
    toggleAutoUpdate,
    resetConfig,
  };
});

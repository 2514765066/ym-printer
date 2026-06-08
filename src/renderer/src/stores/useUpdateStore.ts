import { useConfigStore } from "@/stores/useConfigStore";
import eventEmitter from "@/hooks/eventEmitter";
import MessageBox from "@/components/ui/message-box";
import { repoMap } from "@/map";
import { useStorage } from "@vueuse/core";
import { isOverOneDay } from "@/utils/date";

type Status =
  | "init"
  | "checking"
  | "updateAvailable"
  | "updateNotAvailable"
  | "downloading"
  | "downloaded"
  | "error";

export const useUpdateStore = defineStore("update", () => {
  const { config } = storeToRefs(useConfigStore());

  //状态
  const status = ref<Status>("init");

  //上次更新时间
  const lastUpdateTime = useStorage("lastUpdateTime", 0);

  //最新版本
  const latestVersion = ref("");

  //下载进度
  const downloadProgress = ref(0);

  //安装更新
  const installUpdate = async () => {
    //安装
    const res = await MessageBox.confirm({
      title: "安装新版本",
      description: "新版本下载完成,是否安装?",
    });

    //不安装
    if (!res) {
      return;
    }

    await ipcRenderer.invoke("installUpdate");
  };

  //检查更新
  const checkUpdate = async () => {
    try {
      status.value = "checking";

      //更新地址
      const updateUrl = repoMap[config.value.repo].updateUrl;

      const checkRes = await ipcRenderer.invoke("checkUpdata", updateUrl);

      //没有更新
      if (checkRes == false) {
        status.value = "updateNotAvailable";
        return;
      }

      latestVersion.value = checkRes;

      status.value = "downloading";

      const downloadRes = await ipcRenderer.invoke("downloadUpdate");

      if (!downloadRes) {
        eventEmitter.emit("error:show", "下载更新失败,请检查网络");
        return;
      }

      status.value = "downloaded";

      installUpdate();
    } catch (e) {
      eventEmitter.emit("error:show", "更新失败,请检查网络");

      status.value = "init";

      console.error(e);
    }
  };

  //初始化
  const init = () => {
    if (config.value.autoUpdate) {
      const now = Date.now();

      if (isOverOneDay(lastUpdateTime.value, now)) {
        checkUpdate();
        lastUpdateTime.value = now;
      }
    }
  };

  //监听下载进度
  ipcRenderer.addListener("updateProgress", (_, percrent) => {
    downloadProgress.value = percrent;

    if (percrent == 100) {
      status.value = "init";
    }
  });

  init();

  return {
    status,
    downloadProgress,
    latestVersion,
    checkUpdate,
    installUpdate,
  };
});

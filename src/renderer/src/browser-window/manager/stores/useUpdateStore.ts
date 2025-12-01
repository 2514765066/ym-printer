import { useConfigStore } from "@manager/stores/useConfigStore";
import eventEmitter from "@/hooks/eventEmitter";
import { confirm } from "@/components/dialog";
import { getDayDiff } from "@/utils/time";
import { global } from "@/components/loading";

type Status =
  | "init"
  | "checking"
  | "update-available"
  | "update-not-available"
  | "downloading"
  | "downloaded"
  | "error";

export const useUpdateStore = defineStore("update", () => {
  const configStore = useConfigStore();

  //状态
  const status = ref<Status>("init");

  //下载进度
  const downloadProgress = ref(0);

  //检查更新
  const checkUpdate = async () => {
    try {
      status.value = "checking";

      const res = await ipcRenderer.invoke(
        "checkUpdata",
        configStore.config.selectedRepo.updateUrl
      );

      //没有更新
      if (res == false) {
        save();

        status.value = "update-not-available";

        return;
      }

      status.value = "update-available";

      const checkResult = await confirm({
        title: "🎉发现更新",
        content: `发现新版本${res},是否更新?`,
      });

      //不更新
      if (!checkResult) {
        status.value = "init";
        return;
      }

      status.value = "downloading";

      await ipcRenderer.invoke("downloadUpdate");

      status.value = "downloaded";

      //安装
      const installResult = await confirm({
        title: "安装更新",
        content: "更新下载完成是否安装",
      });

      //不安装
      if (!installResult) {
        status.value = "init";
        return;
      }

      save();

      global();

      await ipcRenderer.invoke("installUpdate");
    } catch {
      eventEmitter.emit("error:show", "出错了,请重试");
      status.value = "init";
    }
  };

  //保存
  const save = () => {
    localStorage.setItem("lastUpdateTime", String(Date.now()));
  };

  //监听下载进度
  ipcRenderer.addListener("updateProgress", (_, percrent) => {
    downloadProgress.value = percrent;

    if (percrent == 100) {
      status.value = "init";
    }
  });

  const init = () => {
    const lastUpdateTime = localStorage.getItem("lastUpdateTime");

    const day = getDayDiff(Number(lastUpdateTime) || 0, Date.now());

    if (day < 3) {
      return;
    }

    checkUpdate();
  };

  init();

  return {
    status,
    downloadProgress,
    checkUpdate,
  };
});

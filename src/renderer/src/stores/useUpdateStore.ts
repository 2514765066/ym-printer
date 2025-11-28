import confim from "@/service/confim";
import { getDayDiff } from "@/utils/time";

type Status = "init" | "checking" | "update-available" | "update-not-available";

export const useUpdateStore = defineStore("update", () => {
  //状态
  const status = ref<Status>("init");

  //下载进度
  const downloadProgress = ref(0);

  //检查更新
  const checkUpdate = async () => {
    status.value = "checking";

    const res = await ipcRenderer.invoke("checkUpdata");

    //没有更新
    if (res == false) {
      localStorage.setItem("lastUpdateTime", String(Date.now()));

      status.value = "update-not-available";
      return;
    }

    const result = await confim({
      title: "🎉发现更新",
      message: `发现新版本${res},是否更新?`,
    });

    //不更新
    if (!result) {
      status.value = "init";
      return;
    }

    ipcRenderer.invoke("downloadAndInstall");

    localStorage.setItem("lastUpdateTime", String(Date.now()));

    status.value = "update-available";
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

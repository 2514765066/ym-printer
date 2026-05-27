import { useConfigStore } from "@/stores/useConfigStore";
import eventEmitter from "@/hooks/eventEmitter";
import MessageBox from "@/components/ui/message-box";
import Loading from "@/components/loading";
import { repoMap } from "@/map";

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

  //下载进度
  const downloadProgress = ref(0);

  //检查更新
  const checkUpdate = async () => {
    try {
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

        Loading.service();

        await ipcRenderer.invoke("installUpdate");
      };

      //如果下载完成就直接安装
      if (status.value == "downloaded") {
        installUpdate();
        return;
      }

      status.value = "checking";

      //更新地址
      const updateUrl = repoMap[config.value.repo].updateUrl;

      const res = await ipcRenderer.invoke("checkUpdata", updateUrl);

      //没有更新
      if (res == false) {
        status.value = "updateNotAvailable";
        return;
      }

      status.value = "updateAvailable";

      const checkResult = await MessageBox.confirm({
        title: "🎉发现新版本",
        description: `发现新版本${res},是否更新?`,
      });

      //不更新
      if (!checkResult) {
        status.value = "init";
        return;
      }

      status.value = "downloading";

      await ipcRenderer.invoke("downloadUpdate");

      status.value = "downloaded";

      installUpdate();
    } catch (e) {
      eventEmitter.emit("error:show", "出错了,请重试");

      status.value = "init";

      console.error(e);
    }
  };

  //初始化
  const init = () => {
    if (config.value.autoUpdate) {
      checkUpdate();
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
    checkUpdate,
  };
});

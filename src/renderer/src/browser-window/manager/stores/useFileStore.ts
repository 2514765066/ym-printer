import eventEmitter from "@/hooks/eventEmitter";
import { FileInfo } from "@type";
import { useQueueStore } from "./useQueueStore";

export const useFileStore = defineStore("manager-file", () => {
  const { queue } = storeToRefs(useQueueStore());

  //所有文件
  const files = ref<Map<string, FileInfo>>(new Map());

  //打印完成文件的id
  const finishFilesID = computed(() => {
    return new Set(Array.from(queue.value.values()).map(item => item.file.id));
  });

  //获取文件
  const getFile = (id: string) => {
    return files.value.get(id)!;
  };

  //删除文件
  const removeFile = (id: string) => {
    files.value.delete(id);
  };

  //添加文件
  const addFile = (file: File[]) => {
    const paths = api.getFilePath(file);

    if (paths.length == 0) {
      return;
    }

    ipcRenderer.send("getFilesInfo", paths);
  };

  //清空
  const clearFile = () => {
    files.value.clear();
  };

  //是否完成
  const isFinish = (id: string) => {
    return finishFilesID.value.has(id);
  };

  //文件获取完成
  ipcRenderer.on("finishFilesInfo", (_, data) => {
    for (const item of data) {
      if (files.value.has(item.id)) {
        eventEmitter.emit("error:show", `${item.name}已存在`);
        continue;
      }

      files.value.set(item.id, item);
    }
  });

  return {
    files,
    finishFilesID,
    addFile,
    clearFile,
    getFile,
    removeFile,
    isFinish,
  };
});

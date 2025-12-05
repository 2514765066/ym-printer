import eventEmitter from "@/hooks/eventEmitter";
import { QueueItem } from "@type";
import { nanoid } from "nanoid";

export const useQueueStore = defineStore("manager-queue", () => {
  //完成队列
  const queue = ref(new Map<string, QueueItem>());

  //获取队列
  const getQueue = (id: string) => {
    return queue.value.get(id);
  };

  //移除队列
  const removeQueue = (id: string) => {
    queue.value.delete(id);
  };

  //清除队列
  const clearQueue = () => {
    queue.value.clear();
  };

  //监听完成打印的文件内容
  ipcRenderer.on("finishPrint", (_, option) => {
    const id = nanoid();

    queue.value.set(id, {
      id,
      ...option,
    });

    eventEmitter.emit(
      "success:show",
      `${option.config.remark || option.file.name}打印完成`
    );
  });

  return {
    queue,
    removeQueue,
    clearQueue,
    getQueue,
  };
});

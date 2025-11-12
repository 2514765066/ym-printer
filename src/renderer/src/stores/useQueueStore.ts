import { parserPange } from "@/utils/print";
import { FileInfo, PrintConfig } from "@type";
import { nanoid } from "nanoid";

export class QueueItem {
  id: string;
  pageCount: number;

  info: FileInfo;

  config: PrintConfig;

  duplexRange: number[];
  simplexRange: number[];

  constructor(id: string, option: AddQueueOption) {
    this.id = id;
    this.info = JSON.parse(JSON.stringify(option.info));

    this.config = JSON.parse(JSON.stringify(option.config));

    this.pageCount = option.pageCount;

    this.duplexRange = parserPange(this.config.duplexRange, this.pageCount);
    this.simplexRange = parserPange(this.config.simplexRange, this.pageCount);
  }

  //打印
  public async print(range: number[]) {
    await ipcRenderer.invoke("print", {
      md5: this.info.md5,
      printer: this.config.printer,
      orientation: this.config.orientation,
      count: this.config.count,
      range,
    });
  }

  //打印空白页
  public async printEmpty() {
    await ipcRenderer.invoke("printEmpty", this.config.printer);
  }

  //打印偶数页
  public async printEven() {
    if (this.duplexRange.length % 2 == 1) {
      await this.printEmpty();
    }

    await this.print(
      this.duplexRange.filter((_, index) => (index + 1) % 2 == 0)
    );
  }

  //打印奇数页
  public async printOdd(addSimplex?: boolean) {
    const range = this.duplexRange.filter((_, index) => (index + 1) % 2 == 1);

    if (addSimplex) {
      range.unshift(...this.simplexRange);
    }

    await this.print(range);
  }

  //打印单页
  public async printSimplex() {
    await this.print(this.simplexRange);
  }
}

//打印队列
interface AddQueueOption {
  info: FileInfo;
  config: PrintConfig;
  pageCount: number;
}

export const useQueueStore = defineStore("queue", () => {
  //打印队列
  const printQueue = ref(new Map<string, QueueItem>());

  //完成队列
  const finishQueue = ref(new Map<string, QueueItem>());

  //添加队列
  const addQueue = (option: AddQueueOption | QueueItem) => {
    if (option instanceof QueueItem) {
      const item = markRaw(option);

      printQueue.value.set(option.id, item);
      return;
    }

    const id = nanoid();
    const item = markRaw(new QueueItem(id, option));

    printQueue.value.set(id, item);
  };

  //添加完成队列
  const addFinishQueue = (item: QueueItem) => {
    finishQueue.value.set(item.id, markRaw(item));
    removeQueue(item.id);
  };

  //移除队列
  const removeQueue = (id: string) => {
    printQueue.value.delete(id);
  };

  //移除完成队列
  const removeFinsihQueue = (id: string) => {
    finishQueue.value.delete(id);
  };

  //获取第一个队列元素
  const getFirst = () => {
    return printQueue.value.values().next().value;
  };

  //开始打印
  const startPrint = async (id?: string) => {
    if (printQueue.value.size == 0) {
      return;
    }

    const item = id ? printQueue.value.get(id) : getFirst();

    if (!item) {
      return;
    }

    if (item.duplexRange.length != 0) {
      await item.printEven();

      return async () => {
        await item.printOdd(item.simplexRange.length != 0);

        addFinishQueue(item);
      };
    }

    await item.printSimplex();

    addFinishQueue(item);

    return;
  };

  return {
    printQueue,
    finishQueue,
    addQueue,
    addFinishQueue,
    removeQueue,
    startPrint,
    removeFinsihQueue,
  };
});

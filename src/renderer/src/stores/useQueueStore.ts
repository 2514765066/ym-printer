import { parserPange } from "@/utils/print";
import { FileInfo, PrintConfig } from "@type";
import { nanoid } from "nanoid";

export class QueueItem {
  id: string;

  file: FileInfo;

  config!: PrintConfig;

  duplexRange!: number[];
  simplexRange!: number[];

  constructor(id: string, option: AddQueueOption) {
    this.id = id;

    this.file = toRaw(option.file);

    this.setConfig(option.config);
  }

  public setConfig(config: PrintConfig) {
    this.config = toRaw(config);

    this.duplexRange = parserPange(this.config.duplexRange);
    this.simplexRange = parserPange(this.config.simplexRange);
  }

  //打印
  public async print(range: number[]) {
    const option = {
      md5: this.file.md5,
      printer: this.config.printer,
      orientation: this.config.orientation,
      count: this.config.count,
      range,
    };

    await ipcRenderer.invoke("print", JSON.parse(JSON.stringify(option)));
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

  //价格
  public getPrice(simplexPrice: number, duplexPrice: number) {
    let res = 0;

    res += this.simplexRange.length * this.config.simplexCount * simplexPrice;

    res += Math.floor(this.duplexRange.length / 2) * duplexPrice;

    if (this.duplexRange.length % 2 != 0) {
      res += simplexPrice;
    }

    return Number((res * this.config.count).toFixed(2));
  }
}

//打印队列
interface AddQueueOption {
  file: FileInfo;
  config: PrintConfig;
}

export const useQueueStore = defineStore("queue", () => {
  //打印队列
  const printQueue = ref(new Map<string, QueueItem>());

  //完成队列
  const finishQueue = ref(new Map<string, QueueItem>());

  //是否存在队列中
  const hasQueue = (id: string) => {
    const res = [...printQueue.value.values(), ...finishQueue.value.values()];

    return res.some(item => item.file.id == id);
  };

  //添加队列
  const addQueue = (option: AddQueueOption | QueueItem) => {
    if (option instanceof QueueItem) {
      printQueue.value.set(option.id, option);
      return;
    }
    const id = nanoid();

    printQueue.value.set(id, new QueueItem(id, option));
  };

  //添加完成队列
  const addFinishQueue = (item: QueueItem) => {
    finishQueue.value.set(item.id, item);

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

  //清除队列
  const clearQueue = () => {
    printQueue.value.clear();
    finishQueue.value.clear();
  };

  return {
    printQueue,
    finishQueue,
    addQueue,
    addFinishQueue,
    removeQueue,
    startPrint,
    removeFinsihQueue,
    hasQueue,
    clearQueue,
  };
});

import { FileInfo, PrintConfig } from "@type";

// 定义事件到函数类型的映射
type EventMap = {
  "success:show": (msg: string) => void;

  "tip:show": () => void;
  "tip:hide": () => void;

  "print:show": (
    set: (data: PrintConfig) => void,
    config?: PrintConfig,
    file?: FileInfo
  ) => void;
};

type EventNames = keyof EventMap;

class EventEmitter {
  private listeners = {} as Record<EventNames, Set<Function>>;

  on<T extends EventNames>(eventName: T, listener: EventMap[T]) {
    if (!(eventName in this.listeners)) {
      this.listeners[eventName] = new Set();
    }

    this.listeners[eventName].add(listener);
  }

  emit<T extends EventNames>(eventName: T, ...args: Parameters<EventMap[T]>) {
    if (!(eventName in this.listeners)) {
      return;
    }

    this.listeners[eventName].forEach(listener => listener(...args));
  }
}

export default new EventEmitter();

import { presetTypeMap, workspaceTypeMap } from "@/map";
import { Preset } from "@/stores/usePresetStore";
import { Workspace } from "@/stores/useWorkspaceStore";

// 定义事件到函数类型的映射
type EventMap = {
  "success:show": (msg: string) => void;
  "loading:show": (option: {
    successMsg?: string;
    errorMsg?: string;
    loadingMsg?: string;
    cb: () => Promise<void>;
  }) => void;
  "error:show": (msg: string) => void;

  "dialog-print:show": () => void;
  "dialog-print-task:show": () => void;
  "dialog-setting:show": (id?: string) => void;

  "dialog-workspace:show": (option: {
    type: keyof typeof workspaceTypeMap;
    data?: Workspace;
  }) => void;

  "dialog-preset:show": (option: {
    type: keyof typeof presetTypeMap;
    data?: Preset;
  }) => void;
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

  off<T extends EventNames>(eventName: T, listener: EventMap[T]) {
    if (!(eventName in this.listeners)) {
      return;
    }

    this.listeners[eventName].delete(listener);
  }

  emit<T extends EventNames>(eventName: T, ...args: Parameters<EventMap[T]>) {
    if (!(eventName in this.listeners)) {
      return;
    }

    this.listeners[eventName].forEach(listener => listener(...args));
  }
}

export default new EventEmitter();

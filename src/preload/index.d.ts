import type { Api } from "./index";
import type { IpcRenderer } from "../main/ipc/ipcRenderer";

declare global {
  const __APP_VERSION__: string;
  const __APP_NAME__: string;

  const api: Api;
  const ipcRenderer: IpcRenderer;
}

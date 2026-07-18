import type { Api } from '.';
import type { IpcRenderer } from '../main/ipc/ipcRenderer';

declare global {
  const api: Api;
  const ipcRenderer: IpcRenderer;
}

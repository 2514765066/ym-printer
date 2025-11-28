import { contextBridge, shell, webUtils } from "electron";
import { ipcRenderer } from "../main/ipc/ipcRenderer";
import { extname } from "path";

const api = {
  //打开网页
  openUrl(url: string) {
    shell.openExternal(url);
  },

  getFilePath(files: File[]) {
    const res: string[] = [];

    for (const file of files) {
      const path = webUtils.getPathForFile(file);

      const ext = extname(path).slice(1);

      if (!["docx", "doc", "pdf", "wps"].includes(ext)) {
        continue;
      }

      res.push(path);
    }

    return res;
  },
};

export type Api = typeof api;

contextBridge.exposeInMainWorld("api", api);
contextBridge.exposeInMainWorld("ipcRenderer", {
  send: ipcRenderer.send,
  on: ipcRenderer.on,
  invoke: ipcRenderer.invoke,
  addListener: ipcRenderer.addListener,
});

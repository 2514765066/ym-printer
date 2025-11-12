import { contextBridge, webUtils } from "electron";
import { ipcRenderer } from "../main/ipc/ipcRenderer";
import { extname } from "path";

const api = {
  getFilePath(files: File[]) {
    const res: string[] = [];

    for (const file of files) {
      const path = webUtils.getPathForFile(file);

      const ext = extname(path).slice(1);

      if (!["docx", "doc", "pdf"].includes(ext)) {
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
});

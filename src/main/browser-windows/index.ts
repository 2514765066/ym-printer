import { is } from "@electron-toolkit/utils";
import { BrowserWindow } from "electron";
import { join } from "path";

// export const browserWindows = new Map<string, BrowserWindow>();

//加载文件
export const load = (bw: BrowserWindow) => {
  //生产模式
  if (!is.dev) {
    bw.loadFile(join(__dirname, "../renderer/index.html"));

    return;
  }

  //开发模式
  bw.loadURL(`${process.env["ELECTRON_RENDERER_URL"]}`);
};

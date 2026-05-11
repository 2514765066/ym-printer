import { isSecondeInstanceStart } from "ym-electron.js";
import { createMainWindow } from "@/browser-windows/main";
import "@/ipc/index";
import { createWord, exitWord } from "./service/doc";
import { app } from "electron";
import { optimizer } from "@electron-toolkit/utils";
import { rm } from "fs/promises";
import { cachePath } from "./service/path";

//禁止多开
if (isSecondeInstanceStart()) {
  app.exit();
}

app.whenReady().then(async () => {
  createWord();

  createMainWindow();

  //创建快捷键
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  //退出软件关闭word和缓存
  app.on("before-quit", () => {
    rm(cachePath, { recursive: true });

    exitWord();
  });
});

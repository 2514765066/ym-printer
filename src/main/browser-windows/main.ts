import { join } from "path";
import { BrowserWindow } from "electron";
import { load } from "./index";
import Store from "electron-store";
import { is } from "@electron-toolkit/utils";

const store = new Store();

let lastSize = store.get("window-size", {
  width: 1024,
  height: 768,
}) as Electron.Size;

export const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    show: false,
    width: lastSize.width,
    height: lastSize.height,

    minWidth: 520,
    minHeight: 400,

    titleBarStyle: "hidden",
    titleBarOverlay: {
      symbolColor: "#d4d4d4",
      color: "rgba(0,0,0,0)",
      height: 44,
    },

    webPreferences: {
      preload: join(__dirname, "../preload/index.mjs"),
      sandbox: false,
    },
  });

  //准备就绪打开窗口和开发者选项
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();

    if (is.dev) {
      mainWindow.webContents.openDevTools({ mode: "detach" });
    }
  });

  //处理窗口调整大小
  mainWindow.on("resized", () => {
    const [width, height] = mainWindow.getSize();

    store.set("manager-window-size", {
      width,
      height,
    });
  });

  load(mainWindow);

  return mainWindow;
};

import { join } from "path";
import { BrowserWindow } from "electron";
import { browserWindows, load } from "./index";
import Store from "electron-store";

const store = new Store();

let lastSize = store.get("print-window-size", {
  width: 1024,
  height: 768,
}) as Electron.Size;

export const createPrint = async (id: string) => {
  if (browserWindows.has(id)) {
    const win = browserWindows.get(id)!;

    win.show();
    win.focus();

    return;
  }

  const bw = new BrowserWindow({
    show: false,
    width: lastSize.width,
    height: lastSize.height,

    minWidth: 512,
    minHeight: 384,

    titleBarStyle: "hidden",
    titleBarOverlay: {
      symbolColor: "#d4d4d4",
      color: "rgba(0,0,0,0)",
      height: 44,
    },

    webPreferences: {
      preload: join(__dirname, "../preload/print.mjs"),
      sandbox: false,
    },
  });

  //处理窗口调整大小
  const handleResized = () => {
    const [width, height] = bw.getSize();

    const option = {
      width,
      height,
    };

    lastSize = option;

    store.set("print-window-size", option);
  };

  //处理窗口关闭
  const handleClosed = () => {
    browserWindows.delete(id);

    if (browserWindows.size == 1) {
      const win = browserWindows.get("manager")!;

      win.show();
    }
  };

  browserWindows.set(id, bw);

  bw.on("closed", handleClosed);
  bw.on("resized", handleResized);

  await load(bw, "print");

  return bw;
};

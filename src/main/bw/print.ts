import { join } from "path";
import { isDev } from "ym-electron.js";
import { BrowserWindow } from "electron";
import { browserWindows } from "./index";
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
      // devTools: isDev(),
    },
  });

  bw.on("resized", () => {
    const [width, height] = bw.getSize();

    const option = {
      width,
      height,
    };

    lastSize = option;

    store.set("print-window-size", option);
  });

  bw.on("closed", () => {
    browserWindows.delete(id);
  });

  browserWindows.set(id, bw);

  if (isDev() && process.env["ELECTRON_RENDERER_URL"]) {
    bw.webContents.openDevTools({ mode: "detach" });
    await bw.loadURL(`${process.env["ELECTRON_RENDERER_URL"]}/#/print`);
  } else {
    await bw.loadFile(join(__dirname, "../renderer/index.html"), {
      hash: "print",
    });
  }

  bw.show();

  return bw;
};

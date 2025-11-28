import { isSecondeInstanceStart, onMounted } from "ym-electron.js";
import { createMain } from "@/bw/manager";
import "@/ipc/index";
import { createWord, exitWord } from "./service/doc";
import { app } from "electron";
import { getFileInfo, isDoc } from "./utils/file";

//禁止多开
if (isSecondeInstanceStart()) {
  app.exit();
}

onMounted(async () => {
  createWord();
  const win = await createMain();

  app.on("second-instance", async (_, argv) => {
    //打开文件
    const path = argv.find(item => isDoc(item));

    if (path) {
      const file = await getFileInfo(path);

      win.webContents.send("finishFilesInfo", [file]);
    }

    win.show();
  });

  app.on("before-quit", () => {
    exitWord();
  });

  //打开文件
  const path = process.argv.find(item => isDoc(item));

  if (path) {
    const file = await getFileInfo(path);

    win.webContents.send("finishFilesInfo", [file]);
  }
});

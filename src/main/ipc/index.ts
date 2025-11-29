import { ipcMain } from "./ipcMain";
import { join } from "path";
import { cachePath, printerPath } from "@/service/path";
import { copyFile, mkdir, readdir, stat, rm, readFile } from "fs/promises";
import { toPdf } from "@/service/doc";
import { existsSync } from "fs";
import { FileInfo } from "@type";
import { checkUpdate, downloadAndInstall } from "@/utils/update";
import { BrowserWindow, dialog } from "electron";
import { createPrint } from "../bw/print";
import { browserWindows } from "@/bw";
import { getFileInfo } from "@/utils/file";
import { exec, execFile } from "child_process";

//获取打印机信息
ipcMain.handle("getPrinters", () => {
  const { promise, resolve, reject } = Promise.withResolvers<string[]>();

  exec(
    'powershell "Get-Printer | Select -ExpandProperty Name"',
    (err, stdout) => {
      if (err) {
        reject(err);
        return;
      }

      const printers = stdout
        .split("\n")
        .map(x => x.trim())
        .filter(Boolean)
        .reverse();

      resolve(printers);
    }
  );

  return promise;
});

//获取文件信息
ipcMain.on("getFilesInfo", async (e, paths) => {
  const res: FileInfo[] = [];

  for (const path of paths) {
    const file = await getFileInfo(path);

    res.push(file);
  }

  const win = BrowserWindow.fromWebContents(e.sender);

  win?.webContents.send("finishFilesInfo", res);
});

//读取pdf
ipcMain.handle("getPdf", async (_, md5: string) => {
  const path = join(cachePath, `${md5}.pdf`);

  return await readFile(path);
});

//解析文件
ipcMain.handle("parserFile", async (_, file) => {
  const { md5, ext, path } = file;

  if (!existsSync(cachePath)) {
    await mkdir(cachePath, { recursive: true });
  }

  //存储位置
  const pdfPath = join(cachePath, `${md5}.pdf`);

  if (existsSync(pdfPath)) {
    return;
  }

  //word转pdf
  if (ext == "pdf") {
    await copyFile(path, pdfPath);
  } else {
    console.time(md5);

    await toPdf(path, pdfPath, md5);

    console.timeEnd(md5);
  }
});

//获取缓存大小
ipcMain.handle("getCacheSize", async () => {
  if (!existsSync(cachePath)) {
    return 0;
  }

  let totalSize = 0;

  const files = await readdir(cachePath);

  for (const file of files) {
    const path = join(cachePath, file);

    const stats = await stat(path);

    totalSize += stats.size;
  }

  return totalSize;
});

//清理缓存
ipcMain.handle("clearCache", async () => {
  await rm(cachePath, { recursive: true });
});

//打印
ipcMain.handle("print", async (_, config) => {
  const { printer, count, md5, range, orientation } = config;

  const path = join(cachePath, `${md5}.pdf`);

  execFile(printerPath, [
    `--file=${path}`,
    `--printer=${printer}`,
    `--range=${range.join(",")}`,
    `--orientation=${orientation}`,
    `--count=${count}`,
  ]);
});

//打开打印窗口
ipcMain.handle("openPrint", async (_, option) => {
  const { file } = option;

  const res = await createPrint(file.id);

  res?.webContents.send("openPrint", option);
});

//完成打印
ipcMain.handle("finishPrint", async (_, option) => {
  const win = browserWindows.get("manager")!;

  win.webContents.send("finishPrint", option);
});

//检查更新
ipcMain.handle("checkUpdata", async () => {
  const res = await checkUpdate();

  if (res == false) {
    return false;
  }

  return res.version;
});

//下载并安装
ipcMain.handle("downloadAndInstall", async e => {
  const win = BrowserWindow.fromWebContents(e.sender)!;

  const install = await downloadAndInstall(percent => {
    win.webContents.send("updateProgress", percent);
  });

  const { response } = await dialog.showMessageBox(win, {
    type: "info",
    title: "安装更新",
    message: "更新下载完成是否安装?",
    buttons: ["yes", "cancel"],
  });

  if (response == 0) {
    install();
  }
});

//关闭窗口
ipcMain.handle("close", e => {
  const win = BrowserWindow.fromWebContents(e.sender);

  win?.close();
});

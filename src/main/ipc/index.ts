import { ipcMain } from "./ipcMain";
import { join } from "path";
import { db, resources } from "@/service/path";
import { copyFile, mkdir, readdir, stat, rm, readFile } from "fs/promises";
import ptp from "pdf-to-printer";
import { insertEmptyPage, toPdf } from "@/service/doc";
import { existsSync } from "fs";
import { FileInfo } from "@type";
import { checkUpdate, downloadAndInstall } from "@/utils/update";
import { BrowserWindow, dialog } from "electron";
import { createPrint } from "../bw/print";
import { browserWindows } from "@/bw";
import { getFileInfo } from "@/utils/file";

//获取打印机信息
ipcMain.handle("getPrinter", async () => {
  const printers = await ptp.getPrinters();

  return printers
    .map(item => ({
      name: item.name,
      id: item.deviceId,
    }))
    .reverse();
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
  const path = join(db, `${md5}.pdf`);

  return await readFile(path);
});

//解析文件
ipcMain.handle("parserFile", async (_, file) => {
  const { md5, ext, path } = file;

  if (!existsSync(db)) {
    await mkdir(db, { recursive: true });
  }

  //存储位置
  const pdfPath = join(db, `${md5}.pdf`);

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

  await insertEmptyPage(pdfPath);
});

//获取缓存大小
ipcMain.handle("getCacheSize", async () => {
  if (!existsSync(db)) {
    return 0;
  }

  let totalSize = 0;

  const files = await readdir(db);

  for (const file of files) {
    const path = join(db, file);

    const stats = await stat(path);

    totalSize += stats.size;
  }

  return totalSize;
});

//清理缓存
ipcMain.handle("clearCache", async () => {
  await rm(db, { recursive: true });
});

//打印
ipcMain.handle("print", async (_, config) => {
  const { printer, count, md5, range, orientation } = config;

  const path = join(db, `${md5}.pdf`);

  //必须加1因为第一页为空白页
  const pages = range.map(item => item + 1).join(",");

  await ptp.print(path, {
    sumatraPdfPath: join(resources, "SumatraPDF-3.5.2-32.exe"),
    printer,
    orientation,
    copies: count,
    paperSize: "A4",
    pages,
  });
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

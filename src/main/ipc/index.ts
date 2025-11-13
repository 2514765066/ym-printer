import { getMd5 } from "@/utils/md5";
import { ipcMain } from "./ipcMain";
import { basename, extname, join } from "path";
import { db, emptyPdyPath } from "@/service/path";
import { copyFile, readFile, mkdir, readdir, stat, rm } from "fs/promises";
import ptp from "pdf-to-printer";
import { toPdf } from "@/service/word";
import { existsSync } from "fs";
import { FileInfo } from "@type";
import { checkUpdate, downloadAndInstall } from "@/utils/update";
import { BrowserWindow } from "electron";

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
ipcMain.handle("getFilesInfo", async (_, paths) => {
  const res: FileInfo[] = [];

  for (const path of paths) {
    //名称
    const name = basename(path);

    //后缀
    const ext = extname(path).slice(1);

    //md5
    const md5 = await getMd5(path);

    res.push({
      name,
      ext,
      md5,
      path,
      id: md5 + path,
    });
  }

  return res;
});

//读取pdf
ipcMain.handle("getPdg", async (_, md5: string) => {
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
    await toPdf(md5, path, pdfPath);
    console.timeEnd(md5);
  }
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
  const { printer, orientation, count, md5, range } = config;

  const path = join(db, `${md5}.pdf`);

  await ptp.print(path, {
    printer,
    orientation,
    copies: count,
    paperSize: "A4",
    pages: range.join(","),
  });
});

//打印空白页
ipcMain.handle("printEmpty", async (_, printer: string) => {
  await ptp.print(emptyPdyPath, {
    printer,
    orientation: "portrait",
    copies: 1,
    paperSize: "A4",
    pages: "1",
  });
});

//检查更新
ipcMain.handle("checkUpdata", async e => {
  const res = await checkUpdate();

  if (!res) return false;

  const win = BrowserWindow.fromWebContents(e.sender);

  downloadAndInstall(res, percent => {
    win?.webContents.send("updateProgress", percent);
  });

  return true;
});

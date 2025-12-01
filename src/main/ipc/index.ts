import { ipcMain } from "./ipcMain";
import { join } from "path";
import { cachePath, printerPath, update, updatePath } from "@/service/path";
import { copyFile, mkdir, readdir, stat, rm, readFile } from "fs/promises";
import { toPdf } from "@/service/doc";
import { existsSync } from "fs";
import { FileInfo } from "@type";
import { BrowserWindow } from "electron";
import { createPrint } from "../bw/print";
import { browserWindows } from "@/bw";
import { getFileInfo } from "@/utils/file";
import { exec, execFile } from "child_process";
import { checkUpdate, downloadUpdate, installUpdate } from "ym-publish";
import { getMd5 } from "@/utils/md5";

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
  const { promise, resolve, reject } = Promise.withResolvers<boolean>();

  const { printer, count, md5, range, orientation } = config;

  const path = join(cachePath, `${md5}.pdf`);

  console.time("print");
  execFile(
    printerPath,
    [
      `--file=${path}`,
      `--printer=${printer}`,
      `--range=${range.join(",")}`,
      `--orientation=${orientation}`,
      `--count=${count}`,
    ],
    e => {
      if (e && e.code != 3221225477) {
        reject(false);
        return;
      }

      resolve(true);
      console.timeEnd();
    }
  );

  return promise;
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

let checkUpdateInfo = {
  md5: "",
  version: "",
  url: "",
};

//检查更新
ipcMain.handle("checkUpdata", async (_, url) => {
  const res = await checkUpdate(url, __APP_VERSION__);

  if (res == false) {
    return false;
  }

  checkUpdateInfo = res;

  return res.version;
});

//下载并安装
ipcMain.handle("downloadUpdate", async e => {
  const win = BrowserWindow.fromWebContents(e.sender)!;

  //不存在更新文件夹就创建
  if (!existsSync(update)) {
    await mkdir(update, { recursive: true });
  }

  //如果下载完成就安装
  const md5 = await getMd5(updatePath);

  if (md5 == checkUpdateInfo.md5) {
    return true;
  }

  //下载
  try {
    await downloadUpdate(checkUpdateInfo.url, updatePath, percent => {
      win.webContents.send("updateProgress", Math.floor(percent));
    });
  } catch {
    return false;
  }

  return true;
});

//安装
ipcMain.handle("installUpdate", () => {
  installUpdate(updatePath, true);
});

//关闭窗口
ipcMain.handle("close", e => {
  const win = BrowserWindow.fromWebContents(e.sender);

  win?.close();
});

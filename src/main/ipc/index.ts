import { ipcMain } from "./ipcMain";
import { join } from "path";
import {
  cachePath,
  printerPath,
  resources,
  testPath,
  update,
  updatePath,
} from "@/service/path";
import { copyFile, mkdir, readFile } from "fs/promises";
import { toPdf } from "@/service/doc";
import { existsSync } from "fs";
import { Doc, PrinterTask } from "@type";
import { app, BrowserWindow, dialog } from "electron";
import { parseDoc } from "@/utils/doc";
import { exec, execFile } from "child_process";
import { checkUpdate, downloadUpdate, installUpdate } from "ym-publish";
import { getMd5 } from "@/utils/md5";
import { formatPrinterTask } from "@/utils/format";

declare global {
  const __APP_VERSION__: string;
}

//获取打印机信息
ipcMain.handle("getPrinters", () => {
  const { promise, resolve } = Promise.withResolvers<string[]>();

  const path = join(resources, "getPrinters.ps1");

  const cmd = `powershell -NoProfile -ExecutionPolicy Bypass -File "${path}"`;

  exec(cmd, (err, stdout) => {
    if (err) {
      resolve([]);
      return;
    }

    const rawPrinters = JSON.parse(stdout);

    const printers = Array.isArray(rawPrinters) ? rawPrinters : [rawPrinters];

    resolve(printers);
  });

  return promise;
});

//添加文档
ipcMain.handle("addDoc", async (e, paths = []) => {
  const win = BrowserWindow.fromWebContents(e.sender)!;

  //路径不存在就选择
  if (paths.length == 0) {
    const result = await dialog.showOpenDialog(win, {
      title: "请选择文档",
      properties: ["openFile", "multiSelections"],
      filters: [
        {
          name: "文档文件",
          extensions: ["doc", "docx", "pdf", "wps"],
        },
      ],
    });

    if (result.canceled) {
      return;
    }

    paths = result.filePaths;
  }

  if (paths.length == 0) {
    return;
  }

  const res: Doc[] = await Promise.all(
    paths.map(async path => {
      return await parseDoc(path);
    }),
  );

  win.webContents.send("addDocFinish", res);
});

//读取pdf
ipcMain.handle("getPdf", async (_, md5: string) => {
  const path = join(cachePath, `${md5}.pdf`);

  return await readFile(path);
});

//解析文件
ipcMain.handle("parserDoc", async (_, file) => {
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

//打印
ipcMain.handle("print", async (_, config, range) => {
  const { promise, resolve, reject } = Promise.withResolvers<boolean>();

  execFile(
    printerPath,
    [
      `--docName=${config.name}`,
      `--file=${join(cachePath, `${config.md5}.pdf`)}`,
      `--printer=${config.printer}`,
      `--range=${range.join(",")}`,
      `--orientation=${config.orientation}`,
      `--count=${config.count}`,
      `--cartridge=${config.cartridge}`,
      `--dpi=300`,
    ],
    e => {
      if (e && e.code != 3221225477) {
        reject(false);
        return;
      }

      resolve(true);
    },
  );

  return promise;
});

//打印测试页面
ipcMain.handle("printTest", (_, printer) => {
  const { promise, resolve, reject } = Promise.withResolvers<boolean>();

  execFile(
    printerPath,
    [`--docName=测试页`, `--file=${testPath}`, `--printer=${printer}`],
    e => {
      if (e && e.code != 3221225477) {
        reject(false);
        return;
      }

      resolve(true);
    },
  );

  return promise;
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
  installUpdate(updatePath, app.getPath("exe"), true);
});

//获取打印机状态
ipcMain.handle("getPrinterTask", (_, printer) => {
  const { promise, resolve } = Promise.withResolvers<PrinterTask[]>();

  const path = join(resources, "getPrinterTasks.ps1");

  const cmd = `powershell -NoProfile -ExecutionPolicy Bypass -File "${path}" -PrinterName "${printer}"`;

  exec(cmd, (err, stdout) => {
    if (err) {
      console.error(err);
      return resolve([]);
    }

    try {
      //原始任务
      const rawTask = JSON.parse(stdout);

      const tasks = Array.isArray(rawTask) ? rawTask : [rawTask];

      //格式化任务
      const res = tasks.map(item => {
        return formatPrinterTask(item);
      });

      resolve(res);
    } catch {
      return resolve([]);
    }
  });

  return promise;
});

//删除打印机任务
ipcMain.handle("removePrinterTask", (_, printer: string, id?: number) => {
  const { promise, resolve } = Promise.withResolvers<boolean>();

  let cmd = `powershell -NoProfile "Remove-PrintJob -PrinterName '${printer}' -ID ${id}"`;

  if (id === undefined) {
    cmd = `powershell -NoProfile "Get-PrintJob -PrinterName '${printer}' | Remove-PrintJob"`;
  }

  exec(cmd, err => {
    if (err) {
      console.error(err);
      return resolve(false);
    }

    resolve(true);
  });

  return promise;
});

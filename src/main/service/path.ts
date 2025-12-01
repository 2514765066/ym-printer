import { app } from "electron";
import { join } from "path";

//资源文件夹
export const resources = join(__dirname, "../../resources");

//缓存路径
export const cachePath = join(resources, "cache");

//打印程序路径
export const printerPath = join(resources, "printer.exe");

//下载更新目录
export const update = join(app.getPath("userData"), "update");

//更新文件
export const updatePath = join(update, "ym-video-update.exe");

import { app } from "electron";
import { join } from "path";

//资源文件夹
export const resources = join(__dirname, "../../resources");

//缓存路径
export const db = join(resources, "cache");

//下载更新目录
export const update = join(app.getPath("userData"), "update");

//日志
export const log = join(resources, "log.txt");

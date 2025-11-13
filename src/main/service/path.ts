import { app } from "electron";
import { join } from "path";

//资源文件夹
export const resources = join(__dirname, "../../resources");

//缓存路径
export const db = join(resources, "cache");

//空白pdf文件路径
export const emptyPdyPath = join(resources, "empty.pdf");

//下载更新目录
export const update = join(app.getPath("userData"), "update");

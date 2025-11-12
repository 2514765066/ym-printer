import { join } from "path";

//资源文件夹
export const resources = join(__dirname, "../../resources");

//缓存路径
export const db = join(resources, "cache");

//空白pdf文件路径
export const emptyPdyPath = join(resources, "empty.pdf");

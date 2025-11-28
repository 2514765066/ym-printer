import { basename, extname } from "path";
import { getMd5 } from "./md5";

export const getFileInfo = async (path: string) => {
  const name = basename(path);

  //后缀
  const ext = extname(path).slice(1);

  //md5
  const md5 = await getMd5(path);

  return {
    name,
    ext,
    md5,
    path,
    id: path,
  };
};

//是不是文档
export const isDoc = (path?: string) => {
  if (!path) {
    return false;
  }

  return /\.(doc|docx|pdf)$/i.test(path);
};

import { basename, extname } from "path";
import { getMd5 } from "./md5";
import { Doc } from "@type";

//解析文档
export const parseDoc = async (path: string): Promise<Doc> => {
  const name = basename(path);

  //后缀
  const ext = extname(path).slice(1);

  //md5
  const md5 = await getMd5(path);

  return {
    id: path,
    name,
    path,
    md5,
    ext,
    pageCount: 0,
    status: "loading",
    remark: "",
    printer: "",
    count: 0,
    mode: "mix",
    range: "",
    cartridge: "black",
    orientation: "portrait",
  };
};

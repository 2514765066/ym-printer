import { basename, extname } from "path";
import { getMd5 } from "./md5";
import { Doc } from "@type";
import { nanoid } from "nanoid";

//解析文档
export const parseDoc = async (option: {
  path: string;
  workspaceId: string;
}): Promise<Doc> => {
  const { path, workspaceId } = option;

  //名称
  const name = basename(path);

  //后缀
  const ext = extname(path).slice(1);

  //md5
  const md5 = await getMd5(path);

  //唯一id
  const id = nanoid();

  return {
    id,
    name,
    path,
    md5,
    ext,
    pageCount: 0,
    status: "loading",
    remark: "",
    printer: "",
    count: 1,
    mode: "",
    range: "",
    cartridge: "",
    orientation: "",
    workspaceId,
    groupId: id,
  };
};

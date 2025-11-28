import { update } from "@/service/path";
import { existsSync } from "fs";
import { mkdir } from "fs/promises";
import { join } from "path";
import { download, install, useGiteeUpdate } from "ym-publish";
import { getMd5 } from "./md5";

const giteeUpdate = useGiteeUpdate({
  repo: "ym-printer",
  owner: "yxingyus",
});

let checkUpdateInfo = {
  md5: "",
  version: "",
  url: "",
};

//检查更新
export const checkUpdate = async () => {
  const res = await giteeUpdate(__APP_VERSION__);

  if (res != false) {
    checkUpdateInfo = res;
  }

  return res;
};

//下载更新并安装
export const downloadAndInstall = async (
  onProgress?: (percent: number) => void
) => {
  //不存在更新文件夹就创建
  if (!existsSync(update)) {
    await mkdir(update, { recursive: true });
  }

  //更新文件路径
  const downloadPath = join(update, "ym-video-update.exe");

  //如果下载完成就安装
  const md5 = await getMd5(downloadPath);

  if (md5 == checkUpdateInfo.md5) {
    return () => {
      install(downloadPath, true);
    };
  }

  //下载
  await download(checkUpdateInfo.url, downloadPath, onProgress);

  return () => {
    install(downloadPath, true);
  };
};

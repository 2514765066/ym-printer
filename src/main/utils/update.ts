import { update } from "@/service/path";
import { existsSync } from "fs";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import { basename, join } from "path";
import { download, install, useGiteeUpdate } from "ym-publish";

declare global {
  const __APP_VERSION__: string;
}

interface UpdateInfo {
  md5: string;
  version: string;
  name: string;
}

//检查更新
export const checkUpdate = useGiteeUpdate({
  repo: "ym-printer",
  owner: "yxingyus",
}).bind(null, __APP_VERSION__);

//下载更新并安装
export const downloadAndInstall = async (
  option: {
    version: string;
    url: string;
    md5: string;
  },
  onProgress?: (percent: number) => void
) => {
  //不存在更新文件夹就创建
  if (!existsSync(update)) {
    await mkdir(update, { recursive: true });
  }

  //更新信息配置路径
  const updateInfoPath = join(update, "update-info.json");

  //更新信息配置
  let updateInfo: UpdateInfo = {
    name: basename(option.url),
    md5: option.md5,
    version: option.version,
  };

  //存在就读取不存在就写入
  if (existsSync(updateInfoPath)) {
    const buffer = await readFile(updateInfoPath);

    updateInfo = JSON.parse(buffer.toString());
  } else {
    await writeFile(updateInfoPath, JSON.stringify(updateInfo));
  }

  //不是当前版本删除文件改写配置
  if (updateInfo.md5 != option.md5) {
    await unlink(join(update, updateInfo.name));

    await writeFile(updateInfoPath, JSON.stringify(updateInfo));
  }

  const downloadPath = join(update, updateInfo.name);

  await download(option.url, downloadPath, onProgress);

  install(downloadPath, true);
};

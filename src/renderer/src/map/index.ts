import { appName } from "@/services/info";

export const modeMap = {
  simplex: "单打",
  duplex: "双打",
  mix: "混合",
};

export const cartridgeMap = {
  black: "黑白",
  color: "彩色",
};

export const orientationMap = {
  portrait: "纵向",
  landscape: "横向",
};

export const printStatusMap = {
  Printing: "打印中",
  Paused: "已暂停",
  Spooling: "正在发送到打印机",
  Deleting: "正在删除",
  Error: "错误",
  Offline: "脱机",
  PaperOut: "缺纸",
  Printed: "已打印",
  Retained: "已保留",
  Restarted: "已重新启动",
  UserIntervention: "需要用户干预",
  Blocked: "被阻止",
  Completed: "已完成",
};

export const repoMap = {
  gitee: {
    label: "Gitee",
    repoUrl: `https://gitee.com/yxingyus/${appName}`,
    updateUrl: `https://gitee.com/api/v5/repos/yxingyus/${appName}/releases/latest`,
    updateContentUrl: `https://gitee.com/yxingyus/${appName}/blob/main/release-note.md`,
    issueUrl: `https://gitee.com/yxingyus/${appName}/issues`,
  },
  github: {
    label: "GitHub",
    repoUrl: `https://github.com/2514765066/${appName}`,
    updateUrl: `https://api.github.com/repos/2514765066/${appName}/releases/latest`,
    updateContentUrl: `https://github.com/2514765066/${appName}/blob/main/release-note.md`,
    issueUrl: `https://github.com/2514765066/${appName}/issues`,
  },
};

export const updateMap = {
  checking: "正在检查更新...",
  updateAvailable: "发现更新",
  updateNotAvailable: "已是最新版",
  downloading: (value: number | string) => `下载中: ${value}%`,
};

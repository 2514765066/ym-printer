import { parentPort } from "worker_threads";
import winax from "winax";

interface SaveOption {
  md5: string;
  inputPath: string;
  outputPath: string;
}

interface MessageOption {
  action: "open" | "exit" | "save";
  params: Record<string, any>;
}

const port = parentPort!;

if (!port) throw new Error("IllegalState");

let word: winax.Object | null = null;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

//转pdf
const toPdf = (option: SaveOption) => {
  const { md5, inputPath, outputPath } = option;

  const doc = word!.Documents.Open(inputPath, false, true, false);

  doc.ExportAsFixedFormat(outputPath, 17);

  doc.Close(false);

  port.postMessage({
    type: "success",
    data: md5,
  });
};

//退出word
const exit = () => {
  if (!word) return;

  try {
    word.Quit();
  } catch (e) {
    console.error("退出Word失败:", e);
  } finally {
    word = null; // 释放引用
  }
};

//开启word
const open = () => {
  try {
    if (word) {
      exit();
    }

    word = new winax.Object("Word.Application");

    //关闭一些占用启动速度的配置
    word.Visible = false;
    word.DisplayAlerts = 0;
  } catch (e) {
    console.error("创建 Word 实例失败:", e);

    // 此时通常说明底层 COM 被锁死
    throw e;
  }
};

//保存为pdf
const save = async (option: SaveOption) => {
  try {
    toPdf(option);
  } catch (e) {
    console.error("尝试重启 Word 服务...", e);

    try {
      open();
      await sleep(500);

      toPdf(option);
    } catch (e) {
      console.error("重试失败", e);

      port.postMessage({
        type: "error",
        data: option.md5,
      });
    }
  }
};

port.on("message", (option: MessageOption) => {
  const { action, params } = option;

  switch (action) {
    case "open":
      open();
      break;
    case "exit":
      exit();
      break;
    case "save":
      save(params as SaveOption);
      break;
  }
});

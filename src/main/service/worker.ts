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

let word: winax.Object;

//退出word
const exit = () => {
  try {
    word.Quit();
  } catch (e) {
    console.error(e);
  }
};

//开启word
const open = () => {
  word = new winax.Object("Word.Application");

  //关闭一些占用启动速度的配置
  word.Visible = false;
  word.DisplayAlerts = 0;
};

//保存为pdf
const save = (option: SaveOption) => {
  const { md5, inputPath, outputPath } = option;

  try {
    const doc = word.Documents.Open(inputPath, false, true, false);

    doc.ExportAsFixedFormat(outputPath, 17);

    port.postMessage(md5);

    doc.Close(false);
  } catch (e) {
    console.error("worker报错", e);

    open();

    save({
      md5,
      inputPath,
      outputPath,
    });
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

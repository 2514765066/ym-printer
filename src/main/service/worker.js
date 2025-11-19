const { parentPort } = require("worker_threads");
const { Object } = require("winax");

let word = null;

//退出word
const exit = () => {
  try {
    if (word === null) {
      return;
    }

    word.Quit();
    word = null;
  } catch (e) {
    console.error(e);
  }
};

//开启word
const open = () => {
  word = new Object("Word.Application");

  //关闭一些占用启动速度的配置
  word.Visible = false;
  word.DisplayAlerts = 0;
};

//保存为pdf
const save = (md5, inputPath, outputPath) => {
  try {
    const doc = word.Documents.Open(inputPath, false, true, false);

    doc.ExportAsFixedFormat(outputPath, 17);

    parentPort.postMessage(md5);

    doc.Close(false);
  } catch (e) {
    console.error("worker报错", e);

    open();

    save(md5, inputPath, outputPath);
  }
};

const actionMap = {
  open,
  exit,
  save,
};

parentPort.on("message", msg => {
  const run = actionMap[msg.action];

  run(msg.md5, msg.inputPath, msg.outputPath);
});

const { parentPort } = require("worker_threads");
const { Object } = require("winax");

let word = null;

//开启word
const open = () => {
  word = new Object("Word.Application");

  //关闭一些占用启动速度的配置
  word.Visible = false;
  word.DisplayAlerts = 0;
};

//退出word
const exit = () => {
  if (!word) {
    return;
  }

  word.Quit();
  word = null;
};

//保存为pdf
const save = (md5, inputPath, outputPath) => {
  const doc = word.Documents.Open(inputPath, false, true, false);

  doc.ExportAsFixedFormat(outputPath, 17);

  parentPort.postMessage(md5);

  doc.Close(false);
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

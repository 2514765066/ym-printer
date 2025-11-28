import workerPath from "./worker?nodeWorker";
import { readFile, writeFile } from "node:fs/promises";
import { PDFDocument } from "pdf-lib";

const worker = workerPath({
  workerData: "worker",
});

//创建word实例
export const createWord = () => {
  worker.postMessage({
    action: "open",
  });
};

//删除word实例
export const exitWord = async () => {
  worker.postMessage({
    action: "exit",
  });
};

//转pdf
export const toPdf = async (
  inputPath: string,
  outputPath: string,
  md5: string
) => {
  const { promise, resolve } = Promise.withResolvers();

  const handle = (_md5: string) => {
    if (md5 == _md5) {
      resolve(true);

      worker.removeListener("message", handle);
    }
  };

  worker.addListener("message", handle);

  worker.postMessage({
    action: "save",
    params: {
      inputPath,
      outputPath,
      md5,
    },
  });

  return promise;
};

//给pdf第一页插入空白页
export const insertEmptyPage = async (path: string) => {
  const file = await readFile(path);

  const pdf = await PDFDocument.load(file);

  pdf.insertPage(0);

  const out = await pdf.save();

  await writeFile(path, out);
};

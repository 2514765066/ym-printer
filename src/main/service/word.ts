import { Worker } from "node:worker_threads";
import workerPath from "./worker?modulePath";

const worker = new Worker(workerPath);

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
  md5: string,
  inputPath: string,
  outputPath: string
) => {
  const { promise, resolve } = Promise.withResolvers();

  const handle = _md5 => {
    if (md5 == _md5) {
      resolve(true);

      worker.removeListener("message", handle);
    }
  };

  worker.addListener("message", handle);

  worker.postMessage({
    action: "save",
    inputPath,
    outputPath,
    md5,
  });

  return promise;
};

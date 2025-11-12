import { resources } from "@/service/path";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { join } from "path";

let wordProcess: ChildProcessWithoutNullStreams;

//创建word实例
export const createWord = () => {
  wordProcess = spawn("powershell.exe", [
    "-ExecutionPolicy",
    "Bypass",
    "-File",
    join(resources, "convert.ps1"),
  ]);
};

//删除word实例
export const removeWord = () => {
  if (!wordProcess) {
    return;
  }

  wordProcess.stdin.write(`exit\n`);
};

//转pdf
export const toPdf = (md5: string, inputPath: string, outputPath: string) => {
  const { promise, resolve } = Promise.withResolvers();

  const handle = (data: Buffer) => {
    // console.log(data.toString());

    if (md5 == data.toString().trim()) {
      wordProcess.stdout.removeListener("data", handle);

      resolve(true);
    }
  };

  wordProcess.stdout.addListener("data", handle);

  const payload = JSON.stringify({ md5, inputPath, outputPath });
  wordProcess.stdin.write(payload + "\n");

  return promise;
};

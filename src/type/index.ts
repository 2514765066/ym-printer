//ipc事件配置
export type IpcEvent = {
  //获取打印机信息
  getPrinters: () => string[];

  //获取文件信息
  getFilesInfo: (paths: string[]) => void;

  //文件信息获取完成
  finishFilesInfo: (files: FileInfo[]) => void;

  //解析文件
  parserFile: (file: FileInfo) => void;

  //获取pdf
  getPdf: (md5: string) => Buffer<ArrayBuffer>;

  //获取缓存大小
  getCacheSize: () => number;

  //清理缓存
  clearCache: () => void;

  //更新进度
  updateProgress: (percent: number) => boolean;

  //打印
  print: (config: PrintOption) => boolean;

  //打开打印窗口
  openPrint: (option: OpenPrint) => void;

  //完成打印
  finishPrint: (option: FinishPrintOption) => void;

  //关闭窗口
  close: () => void;

  //检查更新
  checkUpdata: () => false | string;

  //下载并安装
  downloadAndInstall: () => void;
};

//打印配置
interface PrintOption {
  md5: string;
  printer: string;
  count: number;
  orientation: "portrait" | "landscape";
  range: number[];
}

//打开打印的配置
interface OpenPrint {
  file: FileInfo;
  config?: PrintConfig;
}

//完成打印的配置
interface FinishPrintOption {
  file: FileInfo;
  config: PrintConfig;
  range: number[];
}

//文件信息
export type FileInfo = {
  id: string;

  //文件名
  name: string;

  //文件路径
  path: string;

  //md5
  md5: string;

  //拓展名
  ext: string;
};

//打印配置
export type PrintConfig = {
  //备注
  remark: string;

  //打印机id
  printer: string;

  //方向
  orientation: "portrait" | "landscape";

  //打印数量
  count: number;

  //模式
  mode: "simplex" | "duplex" | "mix";

  //范围
  range: string;
};

//队列项
export type QueueItem = FinishPrintOption & {
  //文件id
  id: string;
};

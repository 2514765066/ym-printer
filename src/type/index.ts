//ipc事件配置
export type IpcEvent = {
  getFilesInfo: (paths: string[]) => FileInfo[];

  //获取打印机信息
  getPrinter: () => Printer[];

  //解析文件
  parserFile: (file: FileInfo) => void;

  //获取pdf
  getPdg: (md5: string) => Buffer<ArrayBuffer>;

  //获取缓存大小
  getCacheSize: () => number;

  //清理缓存
  clearCache: () => void;

  //检查更新
  checkUpdata: () => boolean;

  //更新进度
  updateProgress: (percent: number) => boolean;

  //打印
  print: (config: {
    printer: string;
    orientation: "portrait" | "landscape";
    count: number;
    md5: string;
    range: number[];
  }) => void;

  //打印空白页
  printEmpty: (printer: string) => void;
};

//打印机信息
export type Printer = {
  name: string;
  id: string;
};

//文件信息
export type FileInfo = {
  //文件名
  name: string;

  //文件路径
  path: string;

  //md5
  md5: string;

  //拓展名
  ext: string;

  id: string;
};

//打印配置
export type PrintConfig = {
  //打印机id
  printer: string;

  //打印方向
  orientation: "portrait" | "landscape";

  //打印数量
  count: number;

  //打印备注
  remarks: string;

  //单打范围
  simplexRange: string;

  //单面打印数量
  simplexCount: number;

  //双打范围
  duplexRange: string;
};

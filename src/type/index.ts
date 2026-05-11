//ipc事件配置
export type IpcEvent = {
  //获取打印机信息
  getPrinters: () => string[];

  //添加文档
  addDoc: (paths?: string[]) => void;

  //添加文档完成
  addDocFinish: (dos: Doc[]) => void;

  //解析文档
  parserDoc: (file: Doc) => void;

  //获取pdf
  getPdf: (md5: string) => Buffer<ArrayBuffer>;

  //打印
  print: (config: Doc, range: number[]) => boolean;

  //打印测试也
  printTest: (printer: string) => boolean;

  //更新进度
  updateProgress: (percent: number) => boolean;

  //检查更新
  checkUpdata: (url: string) => false | string;

  //下载
  downloadUpdate: () => boolean;

  //安装
  installUpdate: () => void;

  //获取打印机打印队列
  getPrinterTask: (printer: string) => PrinterTask[];

  //删除打印机任务
  removePrinterTask: (printer: string, id?: number) => boolean;
};

//文档信息
export type Doc = {
  //状态
  status: "loading" | "init" | "printing" | "printed";

  //唯一标识
  id: string;

  //文件名
  name: string;

  //文件路径
  path: string;

  //md5
  md5: string;

  //拓展名
  ext: string;

  //页数
  pageCount: number;

  //备注
  remark: string;

  //打印机id
  printer: string;

  //打印数量
  count: number;

  //模式
  mode: "simplex" | "duplex" | "mix";

  //范围
  range: string;

  //墨盒类型
  cartridge: "black" | "color";

  //方向
  orientation: "portrait" | "landscape";

  //格式化范围
  formatRange?: number[];
};

//完成的文档信息
export type DocFinish = Doc & DocPrintConfig;

//打印配置
export type DocPrintConfig = {
  //备注
  remark: string;

  //打印机id
  printer: string;

  //打印数量
  count: number;

  //模式
  mode: "simplex" | "duplex" | "mix";

  //范围
  range: string;

  //墨盒类型
  cartridge: "black" | "color";

  //方向
  orientation: "portrait" | "landscape";
};

//打印任务
export interface PrinterTask {
  id: number;
  name: string;
  status: string[];
}

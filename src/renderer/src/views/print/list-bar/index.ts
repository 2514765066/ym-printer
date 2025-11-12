import { PrintConfig } from "@type";
import { FormRules } from "element-plus";

export const rules: FormRules<PrintConfig> = {
  printer: {
    required: true,
    message: "请选择打印机",
    trigger: "change",
  },

  orientation: {
    required: true,
    message: "请选择方向",
    trigger: "change",
  },

  count: {
    required: true,
    message: "请输入总份数",
    trigger: "change",
  },

  simplexRange: {
    trigger: "change",
    validator(_: any, value: string, callback: any) {
      //为空
      if (value == "") {
        callback();
        return;
      }

      //只是数字
      if (/^([1-9]\d*)$/.test(value)) {
        callback();
        return;
      }

      //是范围
      if (/^([1-9]\d*)?-([1-9]\d*)?$/.test(value)) {
        callback();
        return;
      }

      callback(new Error("不符合格式"));
    },
  },

  simplexCount: {
    required: true,
    message: "请输入单面打印份数",
    trigger: "change",
  },

  duplexRange: {
    trigger: "change",
    validator(_: any, value: string, callback: any) {
      if (value == "") {
        callback();
        return;
      }

      if (/^([1-9]\d*)?-([1-9]\d*)?$/.test(value)) {
        callback();
        return;
      }

      callback(new Error("不符合格式"));
    },
  },
};

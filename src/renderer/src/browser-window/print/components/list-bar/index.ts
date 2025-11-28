import { PrintConfig } from "@type";
import { FormRules } from "element-plus";
import { FormInstance } from "element-plus";

export const ruleFormRef = ref<FormInstance>();

//验证表单
export const validate = async () => {
  return await ruleFormRef.value?.validate();
};

export const rules: FormRules<PrintConfig> = {
  printer: {
    required: true,
    message: "请选择打印机",
    trigger: "change",
  },

  range: {
    required: true,
    trigger: "change",
    validator(_: any, value: string, callback: any) {
      if (value == "") {
        callback(new Error("请输入范围"));
      }

      if (
        /^(([1-9]\d*)?-([1-9]\d*)?|([1-9]\d*))((,|，)(([1-9]\d*)?-([1-9]\d*)?|([1-9]\d*)))*$/.test(
          value
        )
      ) {
        callback();
        return;
      }

      callback(new Error("格式有误"));
    },
  },
};

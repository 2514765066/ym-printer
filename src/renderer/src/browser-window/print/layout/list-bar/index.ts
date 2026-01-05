import eventEmitter from "@/hooks/eventEmitter";
import { FormInstance } from "element-plus";

export const ruleFormRef = ref<FormInstance>();

//是否加载
export const printing = ref(false);

//验证函数
export const useValidate = (cb: () => void | Promise<void>) => {
  return async () => {
    const valid = await ruleFormRef.value?.validate();

    //验证失败
    if (!valid) {
      return;
    }

    printing.value = true;

    try {
      await cb();
    } catch {
      eventEmitter.emit("error:show", "打印失败");
    } finally {
      printing.value = false;
    }
  };
};

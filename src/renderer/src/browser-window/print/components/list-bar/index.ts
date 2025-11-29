import { FormInstance } from "element-plus";

export const ruleFormRef = ref<FormInstance>();

//验证表单
export const validate = async () => {
  return await ruleFormRef.value?.validate();
};

import { ElMessageBox, MessageType } from "element-plus";

interface Option {
  title: string;
  message: string;
  type?: MessageType;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export default async (option: Option) => {
  try {
    await ElMessageBox.confirm(option.message, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      closeOnClickModal: false,
      closeOnPressEscape: false,
      ...option,
    });
    return true;
  } catch {
    return false;
  }
};

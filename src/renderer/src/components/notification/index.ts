import { ElNotification } from "element-plus";
import PrintTipContent from "./print-tip-content.vue";

interface PrintTipOption {
  onCancel?: () => void | Promise<void>;
  onConfirm?: () => void | Promise<void>;
}

export const printTip = ({ onCancel, onConfirm }: PrintTipOption) => {
  const handle = ElNotification({
    title: "请翻页",
    position: "bottom-right",
    duration: 0,
    type: "info",
    onClose: onCancel,
    message: () =>
      h(PrintTipContent, {
        onCancel: async () => {
          handle.close();

          onCancel && (await onCancel());
        },
        onConfirm: async () => {
          handle.close();

          onConfirm && (await onConfirm());
        },
      }),
  });

  return () => handle.close();
};

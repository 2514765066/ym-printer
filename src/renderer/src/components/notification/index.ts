import { ElNotification } from "element-plus";
import PrintTipContent from "./print-tip-content.vue";

export const printDialog = () => {
  const { promise, resolve } = Promise.withResolvers<boolean>();

  const handle = ElNotification({
    title: "请翻页",
    position: "bottom-right",
    duration: 0,
    onClose: () => handle.close(),
    message: () =>
      h(PrintTipContent, {
        onCancel: async () => {
          handle.close();

          resolve(false);
        },
        onConfirm: async () => {
          handle.close();

          resolve(true);
        },
      }),
  });

  return promise;
};

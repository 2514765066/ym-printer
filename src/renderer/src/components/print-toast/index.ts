import { toast } from "vue-sonner";
import Toast from "./index.vue";
import { Doc } from "@type";

export const printToast = (config: Doc) => {
  const { promise, resolve } = Promise.withResolvers<boolean>();

  const id = toast(
    markRaw(
      h(Toast, {
        data: config,
        onConfirm: () => {
          toast.dismiss(id);
          resolve(true);
        },
        onCancel: () => {
          toast.dismiss(id);
          resolve(false);
        },
      }),
    ),
    {
      duration: Infinity,
      onDismiss() {
        toast.dismiss(id);
        resolve(false);
      },
    },
  );

  return promise;
};

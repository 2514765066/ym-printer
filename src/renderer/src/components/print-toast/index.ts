import { toast } from "vue-sonner";
import Toast from "./index.vue";

export const printToast = (title: string) => {
  const { promise, resolve } = Promise.withResolvers<boolean>();

  const id = toast(
    markRaw(
      h(Toast, {
        title,
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
    },
  );

  return promise;
};

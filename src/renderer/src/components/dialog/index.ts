export const info = ref({
  title: "123",
  content: "1231231231",
  confirmButtonText: "",
  cancelButtonText: "",

  visible: false,
  confirm: () => {},
  cancel: () => {},
});

interface Option {
  title: string;
  content: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export const confirm = (option: Option) => {
  const { promise, resolve } = Promise.withResolvers<boolean>();

  info.value = Object.assign(info.value, {
    ...option,
    visible: true,
    confirm: () => {
      info.value.visible = false;
      resolve(true);
    },
    cancel: () => {
      info.value.visible = false;
      resolve(false);
    },
  });

  return promise;
};

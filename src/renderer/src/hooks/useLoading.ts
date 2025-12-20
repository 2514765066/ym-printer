export default <T extends []>(
  cb: (...arg: T) => Promise<void>
): [Ref<boolean>, (...arg: T) => Promise<void>] => {
  const loading = ref(false);

  const run = async (...args: T) => {
    if (loading.value) {
      return;
    }

    loading.value = true;

    try {
      await cb(...args);
    } finally {
      loading.value = false;
    }
  };

  return [loading, run];
};

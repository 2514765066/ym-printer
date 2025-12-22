import debounce from "@/utils/debounce";

export default <T>(defaultValue: T, key: string) => {
  let value = defaultValue;

  const saveData = debounce(value => {
    localStorage.setItem(key, JSON.stringify(value));
  }, 300);

  const stored = localStorage.getItem(key);

  if (stored !== null) {
    try {
      const json = JSON.parse(stored);

      if (typeof defaultValue == "object") {
        value = Object.assign(defaultValue as object, json);
      } else {
        value = json;
      }
    } catch {
      value = defaultValue;
    }
  }

  const data = ref(value);

  watch(data, saveData, { deep: true });

  return data;
};

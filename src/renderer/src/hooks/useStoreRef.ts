import debounce from "@/utils/debounce";

export default <T>(defaultValue: T, key: string) => {
  const stored = localStorage.getItem(key);

  const saveData = debounce(value => {
    localStorage.setItem(key, JSON.stringify(value));
  }, 300);

  return customRef<T>((track, trigger) => {
    let value: T;

    if (stored !== null) {
      try {
        value = JSON.parse(stored);
      } catch {
        value = defaultValue;
      }
    } else {
      value = defaultValue;
    }

    return {
      get() {
        track();
        return value;
      },
      set(newValue: T) {
        value = newValue;

        saveData(newValue);

        trigger();
      },
    };
  });
};

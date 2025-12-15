import debounce from "@/utils/debounce";

const getData = (id: string) => {
  try {
    return JSON.parse(localStorage.getItem(id) || "");
  } catch {
    return;
  }
};

const setData = (id: string, value: any) => {
  localStorage.setItem(id, JSON.stringify(value));
};

export default <T extends object | number | string | boolean>(
  id: string,
  defaultValue: T
) => {
  const data = ref<T>(getData(id) ?? defaultValue);

  watch(
    data,
    debounce(val => setData(id, val))
  );

  return data;
};

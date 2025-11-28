import { useSettingsStore } from "@manager/stores/useSettingsStore";

//获取价格
export const getPrice = (range: number[]) => {
  const settingsStore = useSettingsStore();

  const simplexPrice = settingsStore.data.simplexPrice * 100;

  const duplexPrice = settingsStore.data.duplexPrice * 100;

  let result = 0;

  for (let i = 1; i < range.length; i += 2) {
    result += range[i] == 0 ? simplexPrice : duplexPrice;
  }

  return result / 100;
};

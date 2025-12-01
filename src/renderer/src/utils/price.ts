import { useConfigStore } from "@manager/stores/useConfigStore";

//获取价格
export const getPrice = (range: number[], count: number) => {
  const settingsStore = useConfigStore();

  const simplexPrice = settingsStore.config.simplexPrice * 100;

  const duplexPrice = settingsStore.config.duplexPrice * 100;

  let result = 0;

  for (let i = 1; i < range.length; i += 2) {
    result += range[i] == 0 ? simplexPrice : duplexPrice;
  }

  return (result * count) / 100;
};

//解析范围
export const parserPange = (range: string, max: number) => {
  const result = new Set<number>();

  const parts = range.split(",").map(s => s.trim());

  for (const part of parts) {
    if (!part) continue;

    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-");

      const start = startStr === "" ? 1 : Number(startStr);

      const end = endStr === "" ? max : Number(endStr);

      for (let i = start; i <= end; i++) result.add(i);
    } else {
      const num = Number(part);

      if (!isNaN(num)) result.add(num);
    }
  }

  return [...result].sort((a, b) => a - b);
};

//计算价格

interface GetPriceOption {
  simplexRange: number[];
  duplexRange: number[];
  simplexPrice: number;
  duplexPrice: number;
  simplexCount: number;
  count: number;
}
export const getPrice = (option: GetPriceOption) => {
  const {
    simplexRange,
    duplexRange,
    simplexPrice,
    duplexPrice,
    simplexCount,
    count,
  } = option;

  let res = 0;

  res += simplexRange.length * simplexPrice * simplexCount;

  res += Math.floor(duplexRange.length / 2) * duplexPrice;

  if (duplexRange.length % 2 != 0) {
    res += simplexPrice;
  }

  return Number((res * count).toFixed(2));
};

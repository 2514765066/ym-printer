//补全范围
export const padRange = (range: string, max: number) => {
  if (!range) {
    return "";
  }

  const parts = range.split(",").map(s => s.trim());

  const result = parts.map(part => {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-");

      const start = startStr === "" ? 1 : startStr;

      const end = endStr === "" ? max : endStr;

      return `${start}-${end}`;
    }

    return part;
  });

  return result.join(",");
};

//解析范围
export const parserPange = (range: string) => {
  const result: number[] = [];

  if (!range) {
    return result;
  }

  const parts = range.split(",").map(s => s.trim());

  for (const part of parts) {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-");

      for (let i = Number(startStr); i <= Number(endStr); i++) result.push(i);
    } else {
      const num = Number(part);

      if (!isNaN(num)) result.push(num);
    }
  }

  return result;
};

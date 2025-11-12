export const formatUnit = (unit?: string | number) => {
  if (!unit) {
    return;
  }

  const res = Number(unit);

  if (isNaN(res)) {
    return unit;
  }

  return `${res}px`;
};

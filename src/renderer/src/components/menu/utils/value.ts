export const getValue = <T extends string | number | boolean | undefined>(
  data: T | ((data?: any) => T),
  customData?: any
) => {
  return typeof data == "function" ? data(customData) : data;
};

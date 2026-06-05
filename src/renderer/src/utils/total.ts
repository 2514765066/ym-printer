export const totalCount = <T>(arr: T[], cb: (item: T) => boolean) => {
  return arr.reduce((previousValue, currentValue) => {
    return previousValue + (cb(currentValue) ? 1 : 0);
  }, 0);
};

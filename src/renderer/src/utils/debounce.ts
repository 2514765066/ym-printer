export default <T extends (...args: any[]) => void>(fn: T, delay = 300) => {
  let timer: number | undefined;

  let _this = this;

  return function (...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = window.setTimeout(() => {
      fn.apply(_this, args);
    }, delay);
  };
};

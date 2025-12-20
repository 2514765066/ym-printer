export default <T extends []>(
  fn: (...args: T) => void,
  interval: number = 1000
) => {
  let lastTime = 0;

  return function (...args: T) {
    const now = Date.now();

    if (now - lastTime >= interval) {
      lastTime = now;

      fn.apply(null, args);
    }
  };
};

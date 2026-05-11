type Status = "default" | "price";

export const status = ref<Status>("default");

export const setStatus = (s: Status = "default") => {
  status.value = s;
};

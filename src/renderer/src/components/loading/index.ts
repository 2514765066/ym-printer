import Loading from "./index.vue";

export const visible = ref(false);

export const global = () => {
  visible.value = true;

  return () => {
    visible.value = false;
  };
};

export { Loading };

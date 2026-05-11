import eventEmitter from "@/hooks/eventEmitter";

export const open = ref(false);

export const close = () => {
  open.value = false;
};

eventEmitter.on("dialog-print:show", () => {
  open.value = true;
});

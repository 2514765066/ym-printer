import eventEmitter from "@/hooks/eventEmitter";
import { FormContext } from "vee-validate";

export const open = ref(false);

export const close = () => {
  open.value = false;
};

eventEmitter.on("dialog-print:show", () => {
  open.value = true;
});

export type Form = FormContext<{
  remark: string;
  printer: string;
  count: number;
  mode: string;
  range: string;
  cartridge: string;
  orientation: string;
}>;

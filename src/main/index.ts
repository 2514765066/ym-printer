import {
  isSecondeInstanceStart,
  onMounted,
  onSecondeInstanceMounted,
} from "ym-electron.js";
import { createMain } from "@/bw/manage";
import "@/ipc/index";
import { createWord, removeWord } from "./utils/print";
import { app } from "electron";

//禁止多开
if (isSecondeInstanceStart()) {
  app.exit();
}

onMounted(async () => {
  createWord();
  const win = await createMain();

  onSecondeInstanceMounted(() => {
    win.show();
  });

  app.on("before-quit", () => {
    removeWord();
  });
});

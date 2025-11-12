import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import vue from "@vitejs/plugin-vue";
import { version, name } from "./package.json";
import AutoImport from "unplugin-auto-import/vite";
import ElementPlus from "unplugin-element-plus/vite";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "@": resolve("src/main"),
        "@type": resolve("src/type/index"),
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(version),
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    define: {
      __APP_VERSION__: JSON.stringify(version),
      __APP_NAME__: JSON.stringify(name),
    },
    build: {
      assetsInlineLimit: 0,
    },
    resolve: {
      alias: {
        "@": resolve("src/renderer/src"),
        "@type": resolve("src/type/index"),
      },
    },

    plugins: [
      vue(),
      ElementPlus({}),
      AutoImport({
        imports: ["vue", "pinia", "vue-router"],
        dts: true,
      }),
    ],
  },
});

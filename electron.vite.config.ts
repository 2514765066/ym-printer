import { resolve } from 'path';
import { defineConfig } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import { version, name, productName } from './package.json';
import AutoImport from 'unplugin-auto-import/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@': resolve('src/main'),
        '@type': resolve('src/shared/type.ts'),
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(version),
    },
  },
  preload: {},
  renderer: {
    define: {
      __APP_VERSION__: JSON.stringify(version),
      __APP_NAME__: JSON.stringify(name),
      __PRODUCT_NAME__: JSON.stringify(productName),
    },
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '@type': resolve('src/shared/type.ts'),
      },
    },

    plugins: [
      vue(),
      tailwindcss(),
      AutoImport({
        imports: ['vue', 'pinia', 'vue-router'],
        dts: true,
      }),
    ],
  },
});

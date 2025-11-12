<template>
  <main>
    <section class="w-fit grid gap-2" ref="container">
      <div
        class="relative"
        :class="{ dark: data.pdfTheme == 'dark' }"
        v-for="(item, index) in pageCount"
        :key="index"
      >
        <canvas ref="canvas"></canvas>

        <span class="absolute top-4 left-4 text-5xl">{{ item }}</span>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfjsWorker from "@/assets/pdf.worker.min.mjs?url";
import { usePdfStore } from "@/stores/usePdfStore";
import { useFileStore } from "@/stores/useFileStore";
import { useSettingsStore } from "@/stores/useSettingsStore";

GlobalWorkerOptions.workerSrc = pdfjsWorker;

const { scale, pageCount } = storeToRefs(usePdfStore());
const { data } = storeToRefs(useSettingsStore());
const { selectedFile } = storeToRefs(useFileStore());
const { dpi } = usePdfStore();

//容器
const container = useTemplateRef("container");

//容器尺寸
const containerSize = ref({
  width: 0,
  height: 0,
});

// 保存所有 canvas 元素
const canvas = shallowRef<HTMLCanvasElement[]>([]);

onMounted(() => {
  watch(
    () => selectedFile.value!.md5,
    async val => {
      const buffer = await ipcRenderer.invoke("getPdg", val);

      const pdf = await getDocument({ data: buffer }).promise;

      pageCount.value = pdf.numPages;

      await nextTick();

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);

        const viewport = page.getViewport({ scale: dpi });

        const el = canvas.value[i - 1];

        // 设置绘制尺寸
        el.width = viewport.width;
        el.height = viewport.height;

        // 渲染 PDF 页面
        await page.render({ canvas: el, viewport }).promise;
      }

      containerSize.value = {
        width: container.value!.clientWidth,
        height: container.value!.clientHeight,
      };
    },
    { immediate: true }
  );
});
</script>

<style scoped lang="scss">
main {
  width: calc(v-bind("containerSize.width * scale / 100") * 1px);
  height: calc(v-bind("containerSize.height * scale  / 100") * 1px);

  > section {
    grid-template-columns: repeat(v-bind("pageCount >1?2:1"), 1fr);
    transform: scale(calc(v-bind("scale") * 1%));
    transform-origin: top left;

    > div {
      > span {
        color: rgba(#000, 0.5);
      }
    }
  }
}

.dark {
  filter: invert(0.8);
}
</style>

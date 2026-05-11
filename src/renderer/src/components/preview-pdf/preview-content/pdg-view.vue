<template>
  <main class="mx-auto">
    <div
      class="w-fit grid gap-2"
      :class="{ 'invert-[0.8] hue-rotate-180': theme == 'dark' }"
      ref="container"
    />
  </main>
</template>

<script setup lang="ts">
import { usePdfStore } from "@/stores/usePdfStore";
import { useDocStore } from "@/stores/useDocStore";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = pdfjsWorker;

const { scale, theme } = storeToRefs(usePdfStore());
const { dpi } = usePdfStore();
const { selectedDoc } = storeToRefs(useDocStore());

//容器
const container = useTemplateRef("container");

//容器尺寸
const containerSize = ref({
  width: 0,
  height: 0,
});

onMounted(async () => {
  if (!selectedDoc.value.md5 || !container.value) {
    return;
  }

  if (container.value.children.length > 0) {
    container.value.replaceChildren();
  }

  const buffer = await ipcRenderer.invoke("getPdf", selectedDoc.value.md5);

  const pdf = await getDocument({ data: buffer }).promise;

  selectedDoc.value!.pageCount = pdf.numPages;

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const viewport = page.getViewport({ scale: dpi });

    const el = document.createElement("canvas");

    // 设置绘制尺寸
    el.width = viewport.width;
    el.height = viewport.height;

    // 渲染 PDF 页面
    await page.render({ canvas: el, viewport }).promise;

    const ctx = el.getContext("2d")!;

    // 设置字体样式
    ctx.font = `${36 * dpi}px system-ui`;
    ctx.fillStyle = "rgba(0,0,0,0.5)";

    ctx.textBaseline = "top";
    ctx.fillText(String(i), 16, 16);

    container.value.appendChild(el);
  }

  containerSize.value = {
    width: container.value!.clientWidth,
    height: container.value!.clientHeight,
  };
});
</script>

<style scoped lang="scss">
main {
  width: calc(v-bind("containerSize.width * scale / 100") * 1px);
  height: calc(v-bind("containerSize.height * scale  / 100") * 1px);

  > div {
    grid-template-columns: repeat(
      v-bind("selectedDoc.pageCount  > 1?2:1"),
      1fr
    );

    transform: scale(calc(v-bind("scale") * 1%));
    transform-origin: top left;
    transition: filter 0.1s;
  }
}
</style>

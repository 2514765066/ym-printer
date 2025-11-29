<template>
  <main class="mx-auto">
    <section
      class="w-fit grid gap-2"
      :class="{ dark }"
      ref="container"
    ></section>
  </main>
</template>

<script setup lang="ts">
import { useViewStore } from "@print/stores/useViewStore";
import { useFileStore } from "@print/stores/useFileStore";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = pdfjsWorker;

const { scale, pageCount, dark } = storeToRefs(useViewStore());
const { dpi } = useViewStore();
const { file } = storeToRefs(useFileStore());

//容器
const container = useTemplateRef("container");

//容器尺寸
const containerSize = ref({
  width: 0,
  height: 0,
});

//渲染函数
const render = async (md5: string) => {
  if (!md5 || !container.value) {
    return;
  }

  if (container.value.children.length > 0) {
    container.value.replaceChildren();
  }

  const buffer = await ipcRenderer.invoke("getPdf", md5);

  const pdf = await getDocument({ data: buffer }).promise;

  pageCount.value = pdf.numPages;

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
};

onMounted(() => {
  watch(() => file.value.md5, render);
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
  }
}

.dark {
  filter: invert(0.8);
}
</style>

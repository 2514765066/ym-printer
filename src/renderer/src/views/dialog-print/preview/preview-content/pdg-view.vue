<template>
  <VuePdfEmbed
    ref="container"
    class="pdf-view m-auto"
    :class="{ 'invert-[0.8] hue-rotate-180': previewTheme == 'dark' }"
    annotation-layer
    :source="buffer"
    :width="500"
    :scale="2"
    :page="page"
    @loaded="handleLoaded"
    @loading-failed="handleError"
    @rendering-failed="handleError"
  />
</template>

<script setup lang="ts">
import { usePdfStore } from "@/stores/usePdfStore";
import { useDocStore } from "@/stores/useDocStore";
import VuePdfEmbed from "@/components/vue-pdf-embed";
import { PDFDocumentProxy } from "pdfjs-dist";
import { Form } from "../../index";
import { parserRange } from "@/utils/range";
import { useThemeStore } from "@/stores/useThemeStore";

const { previewTheme } = storeToRefs(useThemeStore());
const { scale, viewMode } = storeToRefs(usePdfStore());
const { selectedDoc } = storeToRefs(useDocStore());

const form: Form = inject("form")!;

//pdf数据
const buffer = shallowRef<Buffer<ArrayBuffer>>();

//显示的页面
const page = computed(() => {
  if (viewMode.value == "raw") {
    return undefined;
  }

  //预览模式
  if (form.meta.value.valid) {
    return parserRange({
      ...selectedDoc.value,
      ...(form.values as any),
    });
  } else {
    return undefined;
  }
});

//处理加载
const handleLoaded = ({ numPages }: PDFDocumentProxy) => {
  selectedDoc.value.pageCount = numPages;
};

//处理错误
const handleError = (error: Error) => {
  console.error(error);
};

onMounted(async () => {
  if (!selectedDoc.value.md5) {
    return;
  }

  buffer.value = await ipcRenderer.invoke("getPdf", selectedDoc.value.md5);
});
</script>

<style scoped lang="scss">
.pdf-view {
  zoom: v-bind("scale");
}
</style>

<template>
  <TooltipProvider>
    <Layout />

    <DialogPrint />

    <DialogSetting />
  </TooltipProvider>

  <Toaster style="--width: 400px" position="bottom-right" :visible-toasts="5" />
</template>

<script setup lang="ts">
import Layout from "@/layout/index.vue";
import DialogPrint from "@/views/dialog-print/index.vue";
import DialogSetting from "@/views/dialog-setting/index.vue";
import { TooltipProvider } from "@/components/ui/tooltip";
import eventEmitter from "@/hooks/eventEmitter";
import { ElMessage } from "element-plus";
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";

eventEmitter.on("success:show", (message: string) => {
  ElMessage({
    message,
    type: "success",
    duration: 1500,
  });
});

eventEmitter.on("error:show", (message: string) => {
  ElMessage({
    message,
    type: "error",
    duration: 1500,
  });
});
</script>

<style lang="scss"></style>

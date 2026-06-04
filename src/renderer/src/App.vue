<template>
  <TooltipProvider>
    <Layout />

    <DialogPrint />

    <DialogSetting />

    <DialogWorkspaceRename />

    <DialogWorkspaceAdd />
  </TooltipProvider>

  <Toaster />
</template>

<script setup lang="ts">
import Layout from "@/layout/index.vue";
import DialogPrint from "@/views/dialog-print/index.vue";
import DialogSetting from "@/views/dialog-setting/index.vue";
import DialogWorkspaceRename from "@/views/dialog-workspace-rename/index.vue";
import DialogWorkspaceAdd from "@/views/dialog-workspace-add/index.vue";
import { TooltipProvider } from "@/components/ui/tooltip";
import eventEmitter from "@/hooks/eventEmitter";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "vue-sonner";
import { useUpdateStore } from "@/stores/useUpdateStore";
import { usePrinterStore } from "./stores/usePrinterStore";
import "vue-sonner/style.css";

//初始化pinia
useUpdateStore();
usePrinterStore();

eventEmitter.on("success:show", message => {
  toast.success(message, {
    duration: 1500,
    position: "top-center",
  });
});

eventEmitter.on("loading:show", option => {
  toast.promise(option.cb, {
    loading: option.loadingMsg || "加载中...",
    success: option.successMsg || "操作成功",
    error: option.errorMsg || "操作失败",
    duration: 1500,
    position: "top-center",
  });
});

eventEmitter.on("error:show", message => {
  toast.error(message, {
    duration: 1500,
    position: "top-center",
  });
});
</script>

<style lang="scss"></style>

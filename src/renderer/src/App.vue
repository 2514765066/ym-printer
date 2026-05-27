<template>
  <TooltipProvider>
    <Layout />

    <DialogPrint />

    <DialogSetting />

    <DialogWorkspaceRename />

    <DialogWorkspaceAdd />
  </TooltipProvider>

  <Toaster style="--width: 400px" position="bottom-right" :visible-toasts="5" />
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
import "vue-sonner/style.css";
import { toast } from "vue-sonner";

eventEmitter.on("success:show", (message: string) => {
  toast.success(message, {
    duration: 1500,
    position: "top-center",
  });
});

eventEmitter.on("error:show", (message: string) => {
  toast.error(message, {
    duration: 1500,
    position: "top-center",
  });
});
</script>

<style lang="scss"></style>

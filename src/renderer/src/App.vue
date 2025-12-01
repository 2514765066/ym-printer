<template>
  <RouterView />

  <Dialog />
</template>

<script setup lang="ts">
import Dialog from "@/components/dialog/index.vue";
import eventEmitter from "@/hooks/eventEmitter";
import { ElMessage } from "element-plus";

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

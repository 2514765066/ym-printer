<template>
  <section view-class="flex flex-col gap-2">
    <Item v-for="item in printerTasks" :key="item.id" :data="item" />
  </section>
</template>

<script setup lang="ts">
import Item from "./item.vue";
import { usePrinterTaskStore } from "@/stores/usePrinterTaskStore";

const { printerTasks } = storeToRefs(usePrinterTaskStore());
</script>

<style scoped lang="scss"></style>

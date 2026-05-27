<template>
  <section class="h-full flex flex-col bg-sidebar">
    <Workspace />

    <div class="p-2">
      <Separator />
    </div>

    <Nav />
  </section>
</template>

<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import Workspace from "./workspace/index.vue";
import Nav from "./nav/index.vue";
</script>

<style scoped lang="scss"></style>

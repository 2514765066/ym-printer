<template>
  <Container :is-empty="docs.length == 0">
    <template #header>
      <DocHeader />
    </template>

    <template #empty>
      <DocEmpty />
    </template>

    <DocContent />

    <template #footer>
      <DocFooter />
    </template>
  </Container>
</template>

<script setup lang="ts">
import Container from "@/components/container/index.vue";
import DocHeader from "./doc-header/index.vue";
import DocContent from "./doc-content/index.vue";
import DocFooter from "./doc-footer/index.vue";
import DocEmpty from "./doc-empty.vue";
import { useDocStore } from "@/stores/useDocStore";

const { docs } = storeToRefs(useDocStore());
</script>

<style scoped lang="scss"></style>

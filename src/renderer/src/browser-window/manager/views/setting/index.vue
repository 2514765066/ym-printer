<template>
  <Content>
    <main class="py-6">
      <Price />

      <General />

      <About />
    </main>
  </Content>
</template>

<script setup lang="ts">
import Content from "@manager/components/content/index.vue";
import General from "./setting-general/index.vue";
import Price from "./setting-price/index.vue";
import About from "./setting-about/index.vue";
</script>

<style scoped lang="scss"></style>

<template>
  <Item label="版本" icon="info" sub="当前软件版本">
    <p class="px-2 text-main text-sm">{{ appVersion }}</p>
  </Item>
</template>

<script setup lang="ts">
import Item from "@manager/views/setting/setting-item.vue";
import { appVersion } from "@/service/info";
</script>

<style scoped lang="scss"></style>

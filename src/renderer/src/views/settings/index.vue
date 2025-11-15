<template>
  <ElScrollbar class="settings" view-class="p-2 flex flex-col items-center">
    <Group label="价格">
      <SimplexPrice v-model="data.simplexPrice" />

      <DuplexPrice v-model="data.duplexPrice" />
    </Group>

    <Group label="通用">
      <Cache />
    </Group>

    <Group label="关于">
      <Update />

      <UpdateContent />

      <Address />

      <Version />
    </Group>
  </ElScrollbar>
</template>

<script setup lang="ts">
import Group from "@/components/setting-item/group.vue";
import SimplexPrice from "./simplex-price.vue";
import UpdateContent from "./update-content.vue";
import Address from "./address.vue";
import Update from "./update.vue";
import Cache from "./cache.vue";
import DuplexPrice from "./duplex-price.vue";
import Version from "./version.vue";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { ElScrollbar } from "element-plus";

const { data } = storeToRefs(useSettingsStore());
</script>

<style scoped lang="scss"></style>

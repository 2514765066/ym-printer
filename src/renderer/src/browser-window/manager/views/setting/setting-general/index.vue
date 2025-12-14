<template>
  <Group label="通用">
    <AutoUpdate />

    <Repo />

    <Cache />
  </Group>
</template>

<script setup lang="ts">
import Group from "../setting-group.vue";
import Cache from "./general-cache.vue";
import Repo from "./general-repo.vue";
import AutoUpdate from "./general-autoUpdate.vue";
</script>

<style scoped lang="scss"></style>

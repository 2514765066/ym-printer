<template>
  <Group label="关于">
    <Update />

    <UpdateContent />

    <Address />

    <Version />
  </Group>
</template>

<script setup lang="ts">
import Group from "../setting-group.vue";
import Update from "./update.vue";
import UpdateContent from "./update-content.vue";
import Address from "./address.vue";
import Version from "./version.vue";
</script>

<style scoped lang="scss"></style>

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
import Update from "./about-update.vue";
import UpdateContent from "./about-update-content.vue";
import Address from "./about-address.vue";
import Version from "./about-version.vue";
</script>

<style scoped lang="scss"></style>

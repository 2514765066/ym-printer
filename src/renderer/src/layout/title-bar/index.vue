<template>
  <section class="title-bar pl-1.5 flex items-center bg-sidebar app-drag">
    <Tooltip label="切换侧边栏可见性">
      <Button variant="ghost" size="icon-xs" @click="toggleSilderbar">
        <PanelLeftCloseIcon v-if="panelRef?.isExpanded" />

        <PanelLeftIcon v-else />
      </Button>
    </Tooltip>

    <TitleBarNav />

    <TitleBarUpdate class="ml-auto" />
  </section>
</template>

<script setup lang="ts">
import Tooltip from '@/components/tooltip.vue';
import { Button } from '@/components/ui/button';
import { PanelLeftCloseIcon, PanelLeftIcon } from '@lucide/vue';
import { panelRef, toggleSilderbar } from '../index';
import TitleBarNav from './title-bar-nav.vue';
import TitleBarUpdate from './title-bar-update.vue';
</script>

<style scoped lang="scss">
.title-bar {
  grid-area: title-bar;
  padding-right: 148px;

  * {
    -webkit-app-region: no-drag;
  }
}
</style>

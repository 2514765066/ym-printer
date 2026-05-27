<template>
  <section class="title-bar pl-1.5 flex items-center bg-sidebar">
    <Tooltip label="切换侧边栏可见性">
      <Button variant="ghost" size="icon-xs" @click="toggleSilderbar">
        <PanelLeftCloseIcon v-if="panelRef?.isExpanded" />

        <PanelLeftIcon v-else />
      </Button>
    </Tooltip>

    <Tooltip label="返回">
      <Button
        variant="ghost"
        size="icon-xs"
        :disabled="!canGoBack"
        @click="goBack"
      >
        <ArrowLeftIcon />
      </Button>
    </Tooltip>

    <Tooltip label="前进">
      <Button
        variant="ghost"
        size="icon-xs"
        :disabled="!canGoForward"
        @click="goForward"
      >
        <ArrowRightIcon />
      </Button>
    </Tooltip>
  </section>
</template>

<script setup lang="ts">
import Tooltip from "@/components/tooltip.vue";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  PanelLeftCloseIcon,
  PanelLeftIcon,
  ArrowRightIcon,
} from "lucide-vue-next";
import { panelRef, toggleSilderbar } from "..";

const router = useRouter();
const route = useRoute();

const canGoBack = ref(false);
const canGoForward = ref(false);

// 后退逻辑
const goBack = () => {
  router.back();
};

// 前进逻辑
const goForward = () => {
  router.forward();
};

watch(
  () => route.path,
  () => {
    const currentState = window.history.state;

    const currentPosition = currentState.position;
    const totalLength = window.history.length;

    canGoBack.value = currentPosition > 0;

    canGoForward.value = totalLength > currentPosition + 1;
  },
  { immediate: true },
);
</script>

<style scoped lang="scss">
.title-bar {
  grid-area: title-bar;
  padding-right: 148px;

  -webkit-app-region: drag;
  * {
    -webkit-app-region: no-drag;
  }
}
</style>

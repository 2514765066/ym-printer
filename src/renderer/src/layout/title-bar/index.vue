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

    <HoverCard :openDelay="500">
      <HoverCardTrigger class="ml-auto">
        <Button variant="ghost" size="xs" v-if="status == 'downloading'">
          <span class="text-xs">正在下载...</span>
        </Button>

        <Button
          class="h-6.5 px-2.5"
          size="xs"
          v-if="status == 'downloaded'"
          @click="installUpdate"
        >
          <span class="text-xs">更新</span>
        </Button>
      </HoverCardTrigger>

      <HoverCardContent class="py-2 flex flex-col gap-2">
        <div class="flex items-center gap-4">
          <img src="@/assets/icon.png" class="size-10" />

          <div class="flex flex-col">
            <span class="text-sm">{{ productName }}</span>

            <span class="text-sm text-muted-foreground">
              当前版本: {{ appVersion }}
            </span>

            <span class="text-sm text-muted-foreground">
              最新版本: {{ latestVersion }}
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  </section>
</template>

<script setup lang="ts">
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Tooltip from "@/components/tooltip.vue";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  PanelLeftCloseIcon,
  PanelLeftIcon,
  ArrowRightIcon,
} from "lucide-vue-next";
import { panelRef, toggleSilderbar } from "..";
import { productName, appVersion } from "@/services/info";
import { useUpdateStore } from "@/stores/useUpdateStore";

const { latestVersion, status } = storeToRefs(useUpdateStore());
const { installUpdate } = useUpdateStore();
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

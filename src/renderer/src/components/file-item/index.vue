<template>
  <ContextMenu :data="menu">
    <li
      class="p-2 flex items-center gap-2 rounded-md"
      :class="{
        active,
        printed,
        'pointer-events-none': loading,
      }"
      :title="`${data.name}\r\n${data.path}`"
      @click="emits('click')"
    >
      <div class="h-8 flex-center aspect-square">
        <Icon
          icon="loading"
          class="rotate"
          size="28"
          color="rgba(255,255,255,0.6)"
          v-if="loading"
        />

        <ExtIcon class="h-full" :ext="data.ext" v-else />
      </div>

      <div class="flex flex-col gap-0.5 overflow-hidden">
        <span class="text-sm text-main ellipsis">
          {{ data.name }}
        </span>

        <span class="text-xs text-main-darken ellipsis">
          {{ data.path }}
        </span>
      </div>
    </li>
  </ContextMenu>
</template>

<script setup lang="ts">
import ExtIcon from "@/components/icon/ext-icon.vue";
import Icon from "@/components/icon/index.vue";
import { FileInfo } from "@type";
import ContextMenu from "@/components/tooltip/ContextMenu.vue";
import { MenuGrounp } from "@/components/tooltip/BaseMenu";
import eventEmitter from "@/hooks/eventEmitter";

const props = defineProps<{
  data: FileInfo;
  printed?: boolean;
  active?: boolean;
}>();

const emits = defineEmits<{
  click: [];
  remove: [];
  preview: [];
}>();

const menu: MenuGrounp[] = [
  {
    title: "更多操作",
    children: [
      {
        title: "打印配置",
        icon: "print",
        onSelect() {
          emits("preview");
        },
      },
      {
        title: "删除文件",
        icon: "remove",
        hoverColor: "#f87171 ",
        onSelect() {
          emits("remove");

          eventEmitter.emit("success:show", "已删除文件");
        },
      },
    ],
  },
];

const loading = ref(true);

onMounted(async () => {
  await ipcRenderer.invoke(
    "parserFile",
    JSON.parse(JSON.stringify(props.data))
  );

  loading.value = false;
});
</script>

<style scoped lang="scss">
li {
  transition: background-color 0.1s;

  &:hover {
    background-color: var(--hover-bg-color);
  }
}

.active {
  background-color: var(--hover-bg-color);
}

.printed {
  opacity: 0.5;
}
</style>

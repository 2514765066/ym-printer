<template>
  <Item label="重置" icon="reset" sub="重置软件所有设置">
    <Button @click="handleClick">重置</Button>
  </Item>
</template>

<script setup lang="ts">
import Item from "@manager/views/setting/setting-item.vue";
import Button from "@/components/ui/button.vue";
import { useConfigStore } from "@manager/stores/useConfigStore";
import MessageBox from "@/components/ui/message-box";

const { resetConfig } = useConfigStore();

const handleClick = async () => {
  const res = await MessageBox.confirm({
    label: "是否要重置?",
    content: "此操作将会重置软件全部设置",
  });

  if (!res) return;

  resetConfig();
};
</script>

<style scoped lang="scss"></style>

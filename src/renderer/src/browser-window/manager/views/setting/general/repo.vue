<template>
  <Item label="远程数据源" icon="globe" sub="远程更新数据源">
    <ElSelect
      class="ym-select"
      style="width: 150px"
      v-model="select"
      @change="handleChange"
    >
      <ElOption
        v-for="item in repos.values()"
        :key="item.label"
        :label="item.label"
        :value="item.label"
      />
    </ElSelect>
  </Item>
</template>

<script setup lang="ts">
import Item from "@manager/views/setting/setting-item.vue";
import { ElOption, ElSelect } from "element-plus";
import { useConfigStore } from "@manager/stores/useConfigStore";

const { config } = storeToRefs(useConfigStore());
const { setRepo } = useConfigStore();

const repos = new Map([
  [
    "Gitee",
    {
      label: "Gitee",
      url: `https://gitee.com/yxingyus/${__APP_NAME__}`,
      updateUrl: `https://gitee.com/api/v5/repos/yxingyus/${__APP_NAME__}/releases/latest`,
    },
  ],
  [
    "GitHub",
    {
      label: "GitHub",
      url: `https://github.com/2514765066/${__APP_NAME__}`,
      updateUrl: `https://api.github.com/repos/2514765066/${__APP_NAME__}/releases/latest`,
    },
  ],
]);

const select = ref(config.value.selectedRepo.label);

const handleChange = (label: string) => {
  const item = repos.get(label)!;

  setRepo(item);
};
</script>

<style scoped lang="scss"></style>

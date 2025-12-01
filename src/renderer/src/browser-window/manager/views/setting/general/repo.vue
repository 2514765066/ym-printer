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
import { appName } from "@/service/info";

const { config } = storeToRefs(useConfigStore());
const { setRepo } = useConfigStore();

const repos = new Map(
  [
    {
      label: "Gitee",
      url: `https://gitee.com/yxingyus/${appName}`,
      updateUrl: `https://gitee.com/api/v5/repos/yxingyus/${appName}/releases/latest`,
    },
    {
      label: "GitHub",
      url: `https://github.com/2514765066/${appName}`,
      updateUrl: `https://api.github.com/repos/2514765066/${appName}/releases/latest`,
    },
  ].map(item => [item.label, item])
);

const select = ref(config.value.selectedRepo.label);

const handleChange = (label: string) => {
  const item = repos.get(label)!;

  setRepo(item);
};
</script>

<style scoped lang="scss"></style>

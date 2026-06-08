<template>
  <Container>
    <div class="flex flex-col gap-8">
      <ItemGroup>
        <p class="py-3 px-4">界面</p>

        <ItemSeparator />

        <Item size="sm">
          <ItemContent>
            <ItemTitle>基础主题</ItemTitle>

            <ItemDescription>
              设置 {{ productName }} 的基础主题
            </ItemDescription>
          </ItemContent>

          <ItemActions>
            <Select v-model="theme">
              <SelectTrigger class="w-40">
                <SelectValue placeholder="请选择基础主题" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem
                  v-for="item in Object.keys(themeMap)"
                  :key="item"
                  :value="item"
                >
                  {{ themeMap[item] }}
                </SelectItem>
              </SelectContent>
            </Select>
          </ItemActions>
        </Item>

        <Item size="sm">
          <ItemContent>
            <ItemTitle>文档主题</ItemTitle>

            <ItemDescription> 设置预览文档的主题</ItemDescription>
          </ItemContent>

          <ItemActions>
            <Select v-model="previewTheme">
              <SelectTrigger class="w-40">
                <SelectValue placeholder="请选择文档主题" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem
                  v-for="item in Object.keys(themeMap)"
                  :key="item"
                  :value="item"
                >
                  {{ themeMap[item] }}
                </SelectItem>
              </SelectContent>
            </Select>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  </Container>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemSeparator,
  ItemTitle,
  ItemActions,
  ItemGroup,
} from "@/components/ui/item";
import Container from "@/components/container/index.vue";
import { themeMap } from "@/map";
import { productName } from "@/services/info";
import { useThemeStore } from "@/stores/useThemeStore";

const { theme, previewTheme } = storeToRefs(useThemeStore());
</script>

<style scoped lang="scss"></style>

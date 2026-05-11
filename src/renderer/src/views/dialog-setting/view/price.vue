<template>
  <Container>
    <div class="flex flex-col gap-8">
      <ItemGroup>
        <p class="py-3 px-4">黑白价格</p>

        <ItemSeparator />

        <Item size="sm">
          <ItemContent>
            <ItemTitle>单面价格</ItemTitle>

            <ItemDescription> 黑白单面打印的价格 </ItemDescription>
          </ItemContent>

          <ItemActions>
            <NumberField
              :min="0"
              :max="999"
              :step="0.05"
              :format-options="{
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }"
              v-model="config.blackSimplexPrice"
            >
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
          </ItemActions>
        </Item>

        <Item size="sm">
          <ItemContent>
            <ItemTitle>双面价格</ItemTitle>

            <ItemDescription> 黑白双面打印的价格</ItemDescription>
          </ItemContent>

          <ItemActions>
            <NumberField
              :min="0"
              :max="999"
              :step="0.05"
              :format-options="{
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }"
              v-model="config.blackDuplexPrice"
            >
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
          </ItemActions>
        </Item>
      </ItemGroup>

      <ItemGroup>
        <p class="py-3 px-4">彩色价格</p>

        <ItemSeparator />

        <Item size="sm">
          <ItemContent>
            <ItemTitle>单面价格</ItemTitle>

            <ItemDescription> 彩色单面打印的价格 </ItemDescription>
          </ItemContent>

          <ItemActions>
            <NumberField
              :min="0"
              :max="999"
              :step="0.05"
              :format-options="{
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }"
              v-model="config.colorSimplexPrice"
            >
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
          </ItemActions>
        </Item>

        <Item size="sm">
          <ItemContent>
            <ItemTitle>双面价格</ItemTitle>

            <ItemDescription> 彩色双面打印的价格</ItemDescription>
          </ItemContent>

          <ItemActions>
            <NumberField
              :min="0"
              :max="999"
              :step="0.05"
              :format-options="{
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }"
              v-model="config.colorDuplexPrice"
            >
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  </Container>
</template>

<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
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
import { useConfigStore } from "@/stores/useConfigStore";

const { config } = storeToRefs(useConfigStore());
</script>

<style scoped lang="scss"></style>

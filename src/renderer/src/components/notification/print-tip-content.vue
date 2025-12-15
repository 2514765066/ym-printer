<template>
  <div class="flex flex-col gap-2">
    <span class="text-sub text-sm">是否继续打印奇数页和单页?</span>

    <div class="flex gap-2">
      <Button class="flex-1" type="primary" @click="emits('confirm')">
        继续
      </Button>

      <Button class="flex-1" @click="emits('cancel')">取消</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/ui/button.vue";

const emits = defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<style scoped lang="scss"></style>

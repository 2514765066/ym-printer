<template>
  <div class="stepper-window wh-screen grid">
    <TitleBar />

    <main
      class="w-[80vw] h-[70vh] absolute top-1/2 left-1/2 -translate-1/2 bg-sidebar rounded-2xl shadow-xl"
    >
      <section class="wh-full flex" v-if="currentRoute">
        <div class="w-1/2 flex-center">
          <component
            :is="currentRoute.icon"
            class="size-1/2 text-muted-foreground"
          />
        </div>

        <div class="w-1/2 pt-20 pb-10 pr-10 flex flex-col">
          <strong class="mb-4 text-2xl">{{ currentRoute.title }}</strong>

          <span class="mb-[10%] text-muted-foreground">
            {{ currentRoute.description }}
          </span>

          <KeepAlive>
            <component :is="currentRoute.component" v-slot="{ handleSubmit }">
              <div class="mt-auto flex justify-end gap-4">
                <Button
                  class="w-25"
                  variant="ghost"
                  @click="preStep"
                  v-if="!isFirst"
                >
                  上一步
                </Button>

                <Button
                  class="w-25"
                  @click="async () => (await handleSubmit()) && handleNext()"
                >
                  {{ isLast ? "完成" : "下一步" }}
                </Button>
              </div>
            </component>
          </KeepAlive>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import TitleBar from "./title-bar/index.vue";
import { Button } from "@/components/ui/button";
import {
  isFirst,
  isLast,
  nextStep,
  preStep,
  currentRoute,
  initRouter,
} from "./router";

initRouter();

const router = useRouter();

//处理下一步
const handleNext = async () => {
  if (isLast.value) {
    router.replace("/doc");
    return;
  }

  nextStep();
};
</script>

<style scoped lang="scss">
.stepper-window {
  grid-template-rows: 40px calc(100vh - 40px);
}
</style>

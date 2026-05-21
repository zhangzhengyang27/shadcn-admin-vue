<template>
  <div class="h-svh">
    <div class="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 class="text-[7rem] leading-tight font-bold">500</h1>
      <span class="font-medium">抱歉！出错了 :')</span>
      <p class="text-center text-muted-foreground">
        很抱歉给您带来不便。<br />
        请稍后重试。
      </p>
      <div class="mt-6 flex gap-4">
        <Button variant="outline" @click="goBack">返回</Button>
        <Button @click="goHome">返回首页</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '@/components/ui/button/Button.vue'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const goHome = () => {
  router.push('/')
}
</script>

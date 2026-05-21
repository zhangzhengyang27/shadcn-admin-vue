<template>
  <div class="h-svh">
    <div class="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 class="text-[7rem] leading-tight font-bold">401</h1>
      <span class="font-medium">未授权访问</span>
      <p class="text-center text-muted-foreground">
        请使用适当的凭据登录<br />
        以访问此资源。
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

<template>
  <div class="h-svh">
    <div class="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 class="text-[7rem] leading-tight font-bold">503</h1>
      <span class="font-medium">网站正在维护中！</span>
      <p class="text-center text-muted-foreground">
        网站目前不可用。<br />
        我们很快会恢复上线。
      </p>
      <div class="mt-6 flex gap-4">
        <Button variant="outline">了解更多</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
</script>

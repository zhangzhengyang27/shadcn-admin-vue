<template>
  <div class="h-svh">
    <div class="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 class="text-[7rem] leading-tight font-bold">404</h1>
      <span class="font-medium">Sorry! Page not found!</span>
      <p class="text-center text-muted-foreground">
        The page you're looking for<br />doesn't exist or may have been removed.
      </p>
      <div class="mt-6 flex gap-4">
        <Button variant="outline" @click="goBack">Go back</Button>
        <Button @click="goHome">Go home</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const goHome = () => {
  router.push('/')
}
</script>

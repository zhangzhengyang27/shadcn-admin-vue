<template>
  <div class="h-svh">
    <div class="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 class="text-[7rem] leading-tight font-bold">500</h1>
      <span class="font-medium">Oops! Something went wrong :')</span>
      <p class="text-center text-muted-foreground">
        We apologize for the inconvenience.<br />
        Please try again later.
      </p>
      <div class="mt-6 flex gap-4">
        <Button variant="outline" @click="goBack">Go Back</Button>
        <Button @click="goHome">Back to Home</Button>
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

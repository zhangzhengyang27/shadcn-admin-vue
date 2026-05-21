<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)
const progress = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

const startLoading = () => {
  isLoading.value = true
  progress.value = 0
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.random() * 10
    }
  }, 200)
}

const completeLoading = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
  progress.value = 100
  setTimeout(() => {
    isLoading.value = false
    progress.value = 0
  }, 300)
}

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    startLoading()
    setTimeout(completeLoading, 500)
  },
  { immediate: true }
)
</script>

<template>
  <div
    v-if="isLoading"
    class="fixed top-0 left-0 right-0 z-[9999] h-[2px]"
  >
    <div
      class="h-full transition-all duration-300 ease-out"
      :style="{
        width: `${progress}%`,
        backgroundColor: 'var(--muted-foreground)',
        boxShadow: 'var(--muted-foreground) 0 0 4px',
      }"
    />
  </div>
</template>

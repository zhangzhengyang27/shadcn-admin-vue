<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

interface Props {
  class?: string
  fixed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  fixed: false
})

const offset = ref(0)

const onScroll = () => {
  offset.value = document.body.scrollTop || document.documentElement.scrollTop
}

onMounted(() => {
  document.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  document.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    :class="cn(
      'z-50 flex h-16 items-center px-4',
      fixed && 'header-fixed peer/header sticky top-0 w-[inherit]',
      offset > 10 && fixed ? 'shadow' : 'shadow-none',
      props.class
    )"
  >
    <div class="flex items-center gap-2">
      <SidebarTrigger variant="outline" class="max-md:scale-125" />
      <Separator orientation="vertical" class="h-6" />
    </div>
    <div class="flex flex-1 items-center justify-end gap-2">
      <slot />
    </div>
  </header>
</template>

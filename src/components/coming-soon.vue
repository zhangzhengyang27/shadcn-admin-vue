<script setup lang="ts">
import { InfoIcon } from 'lucide-vue-next'

interface Props {
  label?: string
}

withDefaults(defineProps<Props>(), {
  label: 'Coming Soon',
})
</script>

<template>
  <span class="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
    <InfoIcon class="size-3" />
    {{ label }}
  </span>
</template>
<script setup lang="ts">
import { ExternalLinkIcon } from 'lucide-vue-next'

interface Props {
  href: string
}

defineProps<Props>()
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-1 text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80"
  >
    Learn more
    <ExternalLinkIcon class="size-3" />
  </a>
</template>

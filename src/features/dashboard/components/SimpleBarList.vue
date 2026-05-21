<script setup lang="ts">
import { computed } from 'vue'

interface BarListItem {
  name: string
  value: number
}

interface Props {
  items: BarListItem[]
  barClass?: string
  valueFormatter: (n: number) => string
}

const props = withDefaults(defineProps<Props>(), {
  barClass: '',
})

const max = computed(() => Math.max(...props.items.map((i) => i.value), 1))
</script>

<template>
  <ul class="space-y-3">
    <li v-for="item in items" :key="item.name" class="flex items-center justify-between gap-3">
      <div class="min-w-0 flex-1">
        <div class="mb-1 truncate text-xs text-muted-foreground">
          {{ item.name }}
        </div>
        <div class="h-2.5 w-full rounded-full bg-muted">
          <div
            :class="['h-2.5 rounded-full', barClass]"
            :style="{ width: Math.round((item.value / max) * 100) + '%' }"
          />
        </div>
      </div>
      <div class="ps-2 text-xs font-medium tabular-nums">
        {{ valueFormatter(item.value) }}
      </div>
    </li>
  </ul>
</template>
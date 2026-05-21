<script setup lang="ts">
import { ref } from 'vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

const props = withDefaults(defineProps<{
  modelValue?: Date
  placeholder?: string
}>(), {
  placeholder: '选择日期',
})

const emit = defineEmits<{
  'update:modelValue': [value: Date]
}>()

const open = ref(false)

function onCalendarSelect(val: unknown) {
  if (val) {
    emit('update:modelValue', val as Date)
    open.value = false
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        class="w-full justify-start text-left font-normal"
        :class="{ 'text-muted-foreground': !modelValue }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2 h-4 w-4"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
        {{ modelValue ? formatDate(modelValue) : placeholder }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0" align="start">
      <Calendar
        :model-value="(modelValue as any)"
        @update:model-value="onCalendarSelect"
      />
    </PopoverContent>
  </Popover>
</template>

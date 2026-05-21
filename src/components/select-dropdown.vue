<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  options?: Array<{ label: string; value: string }>
}>(), {
  placeholder: 'Select...',
  options: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const open = ref(false)

function onSelect(value: unknown) {
  emit('update:modelValue', String(value))
  open.value = false
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between"
      >
        {{ modelValue || placeholder }}
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
          class="ml-2 h-4 w-4 shrink-0 opacity-50"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command>
        <CommandInput class="border-0 focus:ring-0" :placeholder="placeholder" />
        <CommandList>
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              @select="onSelect"
            >
              {{ option.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

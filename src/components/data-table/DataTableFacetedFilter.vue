<script setup lang="ts">
import { computed } from 'vue'
import { type Column } from '@tanstack/vue-table'
import { CheckIcon, PlusCircledIcon } from '@radix-icons/vue'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

interface Option {
  label: string
  value: string
  icon?: unknown
}

interface Props {
  column?: Column<any, any>
  title?: string
  options: Option[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
})

const facets = computed(() => props.column?.getFacetedUniqueValues())
const selectedValues = computed(() => new Set(props.column?.getFilterValue() as string[]))

function toggleOption(optionValue: string) {
  const newSelectedValues = new Set(selectedValues.value)

  if (newSelectedValues.has(optionValue)) {
    newSelectedValues.delete(optionValue)
  } else {
    newSelectedValues.add(optionValue)
  }

  const filterValues = Array.from(newSelectedValues)
  props.column?.setFilterValue(filterValues.length ? filterValues : undefined)
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" size="sm" class="h-8 border-dashed">
        <PlusCircledIcon class="size-4" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator orientation="vertical" class="mx-2 h-4" />
          <Badge
            variant="secondary"
            class="rounded-sm px-1 font-normal lg:hidden"
          >
            {{ selectedValues.size }}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <template v-if="selectedValues.size > 2">
              <Badge
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                {{ selectedValues.size }} 已选
              </Badge>
            </template>
            <template v-else>
              <Badge
                v-for="option in options.filter((opt) => selectedValues.has(opt.value))"
                :key="option.value"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                {{ option.label }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-50 p-0" align="start">
      <Command>
        <CommandInput :placeholder="title" />
        <CommandList>
          <CommandEmpty>未找到结果。</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              @select="toggleOption(option.value)"
            >
              <div
                :class="
                  cn(
                    'flex size-4 items-center justify-center rounded-sm border border-primary',
                    selectedValues.has(option.value)
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible'
                  )
                "
              >
                <CheckIcon :class="cn('h-4 w-4 text-background')" />
              </div>
              <component
                v-if="option.icon"
                :is="option.icon"
                class="size-4 text-muted-foreground"
              />
              <span>{{ option.label }}</span>
              <span
                v-if="facets?.get(option.value)"
                class="ms-auto flex h-4 w-4 items-center justify-center font-mono text-xs"
              >
                {{ facets.get(option.value) }}
              </span>
            </CommandItem>
          </CommandGroup>
          <template v-if="selectedValues.size > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                :value="`clear-filter-${title}`"
                @select.prevent="column?.setFilterValue(undefined)"
                class="justify-center text-center"
              >
                清除筛选
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

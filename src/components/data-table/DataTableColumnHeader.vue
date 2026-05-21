<script setup lang="ts">
import { type Column } from '@tanstack/vue-table'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from '@radix-icons/vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props {
  column: Column<any, any>
  title: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
})
</script>

<template>
  <div v-if="!column.getCanSort()" :class="cn(props.class)">
    {{ title }}
  </div>

  <div v-else :class="cn('flex items-center space-x-2', props.class)">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="sm" class="h-8 data-[state=open]:bg-accent">
          <span>{{ title }}</span>
          <ArrowDownIcon
            v-if="column.getIsSorted() === 'desc'"
            class="ms-2 h-4 w-4"
          />
          <ArrowUpIcon
            v-else-if="column.getIsSorted() === 'asc'"
            class="ms-2 h-4 w-4"
          />
          <CaretSortIcon v-else class="ms-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <ArrowUpIcon class="size-3.5 text-muted-foreground/70" />
          升序
        </DropdownMenuItem>
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <ArrowDownIcon class="size-3.5 text-muted-foreground/70" />
          降序
        </DropdownMenuItem>
        <template v-if="column.getCanHide()">
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="column.toggleVisibility(false)">
            <EyeNoneIcon class="size-3.5 text-muted-foreground/70" />
            隐藏
          </DropdownMenuItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

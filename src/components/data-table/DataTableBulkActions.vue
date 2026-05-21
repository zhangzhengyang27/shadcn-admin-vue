<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { type Table } from '@tanstack/vue-table'
import { X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Props {
  table: Table<any>
  entityName: string
}

const props = defineProps<Props>()

const selectedRows = computed(() => props.table.getFilteredSelectedRowModel().rows)
const selectedCount = computed(() => selectedRows.value.length)
const announcement = ref('')
const toolbarRef = ref<HTMLDivElement | null>(null)

watch(selectedCount, (newCount) => {
  if (newCount > 0) {
    const message = `${newCount} ${props.entityName}${newCount > 1 ? 's' : ''} selected. Bulk action toolbar is available.`

    queueMicrotask(() => {
      announcement.value = message
    })

    const timer = setTimeout(() => {
      announcement.value = ''
    }, 3000)

    return () => clearTimeout(timer)
  }
})

function handleClearSelection() {
  props.table.resetRowSelection()
}

function handleKeyDown(event: KeyboardEvent) {
  if (!toolbarRef.value) return

  const buttons = toolbarRef.value.querySelectorAll('button')
  if (!buttons.length) return

  const currentIndex = Array.from(buttons).findIndex(
    (button) => button === document.activeElement
  )

  switch (event.key) {
    case 'ArrowRight': {
      event.preventDefault()
      const nextIndex = (currentIndex + 1) % buttons.length
      ;(buttons[nextIndex] as HTMLElement).focus()
      break
    }
    case 'ArrowLeft': {
      event.preventDefault()
      const prevIndex =
        currentIndex === 0 ? buttons.length - 1 : currentIndex - 1
      ;(buttons[prevIndex] as HTMLElement).focus()
      break
    }
    case 'Home': {
      event.preventDefault()
      ;(buttons[0] as HTMLElement).focus()
      break
    }
    case 'End': {
      event.preventDefault()
      ;(buttons[buttons.length - 1] as HTMLElement).focus()
      break
    }
    case 'Escape': {
      const target = event.target as HTMLElement
      const activeElement = document.activeElement as HTMLElement

      const isFromDropdownTrigger =
        target?.getAttribute('data-slot') === 'dropdown-menu-trigger' ||
        activeElement?.getAttribute('data-slot') ===
          'dropdown-menu-trigger' ||
        target?.closest('[data-slot="dropdown-menu-trigger"]') ||
        activeElement?.closest('[data-slot="dropdown-menu-trigger"]')

      const isFromDropdownContent =
        activeElement?.closest('[data-slot="dropdown-menu-content"]') ||
        target?.closest('[data-slot="dropdown-menu-content"]')

      if (isFromDropdownTrigger || isFromDropdownContent) return

      event.preventDefault()
      handleClearSelection()
      break
    }
  }
}
</script>

<template>
  <template v-if="selectedCount > 0">
    <!-- Live region for screen reader announcements -->
    <div
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
      role="status"
    >
      {{ announcement }}
    </div>

    <div
      ref="toolbarRef"
      role="toolbar"
      :aria-label="`Bulk actions for ${selectedCount} selected ${entityName}${selectedCount > 1 ? 's' : ''}`"
      aria-describedby="bulk-actions-description"
      tabindex="-1"
      @keydown="handleKeyDown"
      :class="
        cn(
          'fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl',
          'transition-all delay-100 duration-300 ease-out hover:scale-105',
          'focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none'
        )
      "
    >
      <div
        :class="
          cn(
            'p-2 shadow-xl',
            'rounded-xl border',
            'bg-background/95 backdrop-blur-lg supports-backdrop-filter:bg-background/60',
            'flex items-center gap-x-2'
          )
        "
      >
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="outline"
              size="icon"
              @click="handleClearSelection"
              class="size-6 rounded-full"
              aria-label="清除选择"
              title="清除选择 (Escape)"
            >
              <X />
              <span class="sr-only">清除选择</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>清除选择 (Escape)</p>
          </TooltipContent>
        </Tooltip>

        <Separator class="h-5" orientation="vertical" aria-hidden="true" />

        <div
          class="flex items-center gap-x-1 text-sm"
          id="bulk-actions-description"
        >
          <Badge variant="default" class="min-w-8 rounded-lg" :aria-label="`${selectedCount} selected`">
            {{ selectedCount }}
          </Badge>
          <span class="hidden sm:inline">
            {{ entityName }}
            {{ selectedCount > 1 ? 's' : '' }}
          </span>
          已选中
        </div>

        <Separator class="h-5" orientation="vertical" aria-hidden="true" />

        <slot />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type Table } from '@tanstack/vue-table'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-icons/vue'
import { cn, getPageNumbers } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  table: Table<unknown>
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
})

const currentPage = computed(() => props.table.getState().pagination.pageIndex + 1)
const totalPages = computed(() => props.table.getPageCount())
const pageNumbers = computed(() => getPageNumbers(currentPage.value, totalPages.value))
</script>

<template>
  <div :class="cn('flex items-center justify-between px-2', props.class)">
    <div class="flex items-center gap-4">
      <p class="text-sm font-medium">共 {{ table.getFilteredRowModel().rows.length }} 条</p>
      <div class="flex items-center gap-2">
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="(value) => table.setPageSize(Number(value))"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="String(table.getState().pagination.pageSize)" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="String(pageSize)">
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
        <span class="text-sm font-medium whitespace-nowrap">条/页</span>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <span class="text-sm font-medium whitespace-nowrap">
        第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
      </span>
      <div class="flex items-center space-x-1">
        <Button
          variant="outline"
          class="size-8 p-0 hidden @md/content:block"
          @click="table.setPageIndex(0)"
          :disabled="!table.getCanPreviousPage()"
        >
          <span class="sr-only">跳转到首页</span>
          <DoubleArrowLeftIcon class="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          class="size-8 p-0"
          @click="table.previousPage()"
          :disabled="!table.getCanPreviousPage()"
        >
          <span class="sr-only">上一页</span>
          <ChevronLeftIcon class="h-4 w-4" />
        </Button>

        <template v-for="(pageNumber, index) in pageNumbers" :key="`${pageNumber}-${index}`">
          <span v-if="pageNumber === '...'" class="px-1 text-sm text-muted-foreground">...</span>
          <Button
            v-else
            :variant="currentPage === pageNumber ? 'default' : 'outline'"
            class="h-8 min-w-8 px-2 text-sm"
            @click="table.setPageIndex((pageNumber as number) - 1)"
          >
            {{ pageNumber }}
          </Button>
        </template>

        <Button
          variant="outline"
          class="size-8 p-0"
          @click="table.nextPage()"
          :disabled="!table.getCanNextPage()"
        >
          <span class="sr-only">下一页</span>
          <ChevronRightIcon class="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          class="size-8 p-0 hidden @md/content:block"
          @click="table.setPageIndex(table.getPageCount() - 1)"
          :disabled="!table.getCanNextPage()"
        >
          <span class="sr-only">跳转到末页</span>
          <DoubleArrowRightIcon class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

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
  <div
    :class="
      cn(
        'flex items-center justify-between overflow-clip px-2',
        '@max-2xl/content:flex-col-reverse @max-2xl/content:gap-4',
        props.class
      )
    "
    style="overflow-clip-margin: 1"
  >
    <div class="flex w-full items-center justify-between">
      <div class="flex w-25 items-center justify-center text-sm font-medium @2xl/content:hidden">
        Page {{ currentPage }} of {{ totalPages }}
      </div>
      <div class="flex items-center gap-2 @max-2xl/content:flex-row-reverse">
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="(value) => table.setPageSize(Number(value))"
        >
          <SelectTrigger class="h-8 w-17.5">
            <SelectValue :placeholder="String(table.getState().pagination.pageSize)" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="String(pageSize)">
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
        <p class="hidden text-sm font-medium sm:block">Rows per page</p>
      </div>
    </div>

    <div class="flex items-center sm:space-x-6 lg:space-x-8">
      <div class="flex w-25 items-center justify-center text-sm font-medium @max-3xl/content:hidden">
        Page {{ currentPage }} of {{ totalPages }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="size-8 p-0 @max-md/content:hidden"
          @click="table.setPageIndex(0)"
          :disabled="!table.getCanPreviousPage()"
        >
          <span class="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon class="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          class="size-8 p-0"
          @click="table.previousPage()"
          :disabled="!table.getCanPreviousPage()"
        >
          <span class="sr-only">Previous page</span>
          <ChevronLeftIcon class="h-4 w-4" />
        </Button>

        <!-- Page number buttons -->
        <template v-for="(pageNumber, index) in pageNumbers" :key="`${pageNumber}-${index}`">
          <div v-if="pageNumber === '...'" class="flex items-center">
            <span class="px-1 text-sm text-muted-foreground">...</span>
          </div>
          <Button
            v-else
            :variant="currentPage === pageNumber ? 'default' : 'outline'"
            class="h-8 min-w-8 px-2"
            @click="table.setPageIndex((pageNumber as number) - 1)"
          >
            <span class="sr-only">Go to page {{ pageNumber }}</span>
            {{ pageNumber }}
          </Button>
        </template>

        <Button
          variant="outline"
          class="size-8 p-0"
          @click="table.nextPage()"
          :disabled="!table.getCanNextPage()"
        >
          <span class="sr-only">Next page</span>
          <ChevronRightIcon class="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          class="size-8 p-0 @max-md/content:hidden"
          @click="table.setPageIndex(table.getPageCount() - 1)"
          :disabled="!table.getCanNextPage()"
        >
          <span class="sr-only">Go to last page</span>
          <DoubleArrowRightIcon class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

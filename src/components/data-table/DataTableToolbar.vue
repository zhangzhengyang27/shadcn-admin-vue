<script setup lang="ts">
import { computed } from 'vue'
import { type Table } from '@tanstack/vue-table'
import { Cross2Icon } from '@radix-icons/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'

interface FilterOption {
  columnId: string
  title: string
  options: {
    label: string
    value: string
    icon?: unknown
  }[]
}

interface Props {
  table: Table<any>
  searchPlaceholder?: string
  searchKey?: string
  filters?: FilterOption[]
}

const props = withDefaults(defineProps<Props>(), {
  searchPlaceholder: '筛选...',
  filters: () => [],
})

const isFiltered = computed(() => {
  return (
    props.table.getState().columnFilters.length > 0 ||
    props.table.getState().globalFilter
  )
})
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
      <Input
        v-if="searchKey"
        :placeholder="searchPlaceholder"
        :value="(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''"
        @input="(event: Event) => table.getColumn(searchKey!)?.setFilterValue((event.target as HTMLInputElement).value)"
        class="h-8 w-37.5 lg:w-62.5"
      />
      <Input
        v-else
        :placeholder="searchPlaceholder"
        :value="table.getState().globalFilter ?? ''"
        @input="(event: Event) => table.setGlobalFilter((event.target as HTMLInputElement).value)"
        class="h-8 w-37.5 lg:w-62.5"
      />

      <div class="flex gap-x-2">
        <template v-for="filter in filters" :key="filter.columnId">
          <DataTableFacetedFilter
            v-if="table.getColumn(filter.columnId)"
            :column="table.getColumn(filter.columnId)"
            :title="filter.title"
            :options="filter.options"
          />
        </template>
      </div>

      <Button
        v-if="isFiltered"
        variant="ghost"
        @click="
          () => {
            table.resetColumnFilters()
            table.setGlobalFilter('')
          }
        "
        class="h-8 px-2 lg:px-3"
      >
        重置
        <Cross2Icon class="ms-2 h-4 w-4" />
      </Button>
    </div>

    <DataTableViewOptions :table="table" />
  </div>
</template>

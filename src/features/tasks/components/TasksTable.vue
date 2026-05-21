<script setup lang="ts">
import { ref } from 'vue'
import {
  type SortingState,
  type VisibilityState,
  type ColumnFiltersState,
  FlexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { cn } from '@/lib/utils'
import type { Task } from '../data/schema'
import { priorities, statuses } from '../data/data'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import DataTablePagination from '@/components/data-table/DataTablePagination.vue'
import DataTableToolbar from '@/components/data-table/DataTableToolbar.vue'
import DataTableBulkActions from './DataTableBulkActions.vue'
import { tasksColumns as columns } from './tasks-columns'

interface Props {
  data: Task[]
}

const props = defineProps<Props>()

const rowSelection = ref({})
const sorting = ref<SortingState>([])
const columnVisibility = ref<VisibilityState>({})

const globalFilter = ref('')
const columnFilters = ref<ColumnFiltersState>([])
const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
})

const table = useVueTable({
  get data() {
    return props.data
  },
  columns,
  state: {
    get sorting() { return sorting.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
    get columnFilters() { return columnFilters.value },
    get globalFilter() { return globalFilter.value },
    get pagination() { return pagination.value },
  },
  enableRowSelection: true,
  onRowSelectionChange: (updaterOrValue) => {
    rowSelection.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(rowSelection.value)
        : updaterOrValue
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue
  },
  onColumnVisibilityChange: (updaterOrValue) => {
    columnVisibility.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(columnVisibility.value)
        : updaterOrValue
  },
  globalFilterFn: (row, _columnId, filterValue) => {
    const id = String(row.getValue('id')).toLowerCase()
    const title = String(row.getValue('title')).toLowerCase()
    const searchValue = String(filterValue).toLowerCase()

    return id.includes(searchValue) || title.includes(searchValue)
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  onPaginationChange: (updaterOrValue) => {
    pagination.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(pagination.value)
        : updaterOrValue
  },
  onGlobalFilterChange: (updaterOrValue) => {
    globalFilter.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(globalFilter.value)
        : updaterOrValue
  },
  onColumnFiltersChange: (updaterOrValue) => {
    columnFilters.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(columnFilters.value)
        : updaterOrValue
  },
})
</script>

<template>
  <div :class="cn('max-sm:has-[div[role=toolbar]]:mb-16', 'flex flex-1 flex-col gap-4')">
    <DataTableToolbar
      :table="table"
      search-placeholder="按标题或ID筛选..."
      :filters="[
        {
          columnId: 'status',
          title: '状态',
          options: statuses,
        },
        {
          columnId: 'priority',
          title: '优先级',
          options: priorities,
        },
      ]"
    />
    <div class="overflow-hidden rounded-md border">
      <Table class="min-w-xl">
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :col-span="header.colSpan"
              :class="
                cn(
                  (header.column.columnDef.meta as any)?.className,
                  (header.column.columnDef.meta as any)?.thClassName
                )
              "
            >
              <template v-if="!header.isPlaceholder">
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </template>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :class="
                  cn(
                    (cell.column.columnDef.meta as any)?.className,
                    (cell.column.columnDef.meta as any)?.tdClassName
                  )
                "
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :col-span="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <DataTablePagination :table="(table as any)" class="mt-auto" />
    <DataTableBulkActions :table="table" />
  </div>
</template>

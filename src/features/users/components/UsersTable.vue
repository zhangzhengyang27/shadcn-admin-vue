<script setup lang="ts">
import { ref } from 'vue'
import {
  type SortingState,
  type VisibilityState,
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
import type { User } from '../data/schema'
import { roles } from '../data/data'
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
import { usersColumns as columns } from './users-columns'

interface Props {
  data: User[]
}

const props = defineProps<Props>()

const rowSelection = ref({})
const columnVisibility = ref<VisibilityState>({})
const sorting = ref<SortingState>([])

const columnFilters = ref<any[]>([])
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
    get pagination() { return pagination.value },
    get rowSelection() { return rowSelection.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
  },
  enableRowSelection: true,
  onPaginationChange: (updaterOrValue) => {
    pagination.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(pagination.value)
        : updaterOrValue
  },
  onColumnFiltersChange: (updaterOrValue) => {
    columnFilters.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(columnFilters.value)
        : updaterOrValue
  },
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
  getPaginationRowModel: getPaginationRowModel(),
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
})
</script>

<template>
  <div :class="cn('max-sm:has-[div[role=toolbar]]:mb-16', 'flex flex-1 flex-col gap-4')">
    <DataTableToolbar
      :table="table"
      search-placeholder="筛选用户..."
      search-key="username"
      :filters="[
        {
          columnId: 'status',
          title: '状态',
          options: [
            { label: '活跃', value: 'active' },
            { label: '非活跃', value: 'inactive' },
            { label: '已邀请', value: 'invited' },
            { label: '已暂停', value: 'suspended' },
          ],
        },
        {
          columnId: 'role',
          title: '角色',
          options: roles.map((role) => ({ ...role })),
        },
      ]"
    />
    <div class="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id" class="group/row">
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :col-span="header.colSpan"
              :class="
                cn(
                  'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
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
              class="group/row"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :class="
                  cn(
                    'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
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
                暂无数据。
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

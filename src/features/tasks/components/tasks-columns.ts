import { type ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import DataTableColumnHeader from '@/components/data-table/DataTableColumnHeader.vue'
import { labels, priorities, statuses } from '../data/data'
import type { Task } from '../data/schema'
import DataTableRowActions from './DataTableRowActions.vue'

export const tasksColumns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate'),
        onCheckedChange: (value: boolean) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: '全选',
        class: 'translate-y-0.5',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: '选择行',
        class: 'translate-y-0.5',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: '任务编号' }),
    cell: ({ row }) => {
      const id = row.getValue('id')
      return h('div', { class: 'w-20' }, id != null ? String(id) : '')
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: '标题' }),
    meta: {
      className: 'ps-1 max-w-0 w-2/3',
      tdClassName: 'ps-4',
    },
    cell: ({ row }) => {
      const title = row.getValue('title') as string
      const label = labels.find((l) => l.value === row.original.label)
      const children = [
        label && h(Badge, { key: 'badge', variant: 'outline' }, () => label.label),
        h('span', { key: 'title', class: 'truncate font-medium' }, title || ''),
      ].filter(Boolean)
      return h('div', { class: 'flex space-x-2' }, children)
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: '状态' }),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const statusValue = row.getValue('status') as string
      const status = statuses.find((s) => s.value === statusValue)

      if (!status) return null

      return h('div', { class: 'flex w-25 items-center gap-2' }, [
        status.icon && h(status.icon, { key: 'icon', class: 'size-4 text-muted-foreground' }),
        h('span', { key: 'label' }, status.label),
      ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: '优先级' }),
    meta: { className: 'ps-1', tdClassName: 'ps-3' },
    cell: ({ row }) => {
      const priorityValue = row.getValue('priority') as string
      const priority = priorities.find((p) => p.value === priorityValue)

      if (!priority) return null

      return h('div', { class: 'flex items-center gap-2' }, [
        priority.icon && h(priority.icon, { key: 'icon', class: 'size-4 text-muted-foreground' }),
        h('span', { key: 'label' }, priority.label),
      ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]

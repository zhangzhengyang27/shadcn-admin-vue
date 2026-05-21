import { type ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import DataTableColumnHeader from '@/components/data-table/DataTableColumnHeader.vue'
import LongText from '@/components/long-text.vue'
import { callTypes, roles } from '../data/data'
import type { User } from '../data/schema'
import DataTableRowActions from './DataTableRowActions.vue'

export const usersColumns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate'),
        onCheckedChange: (value: boolean) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all',
        class: 'translate-y-0.5',
      }),
    meta: {
      className: cn('inset-s-0 z-10 rounded-tl-[inherit] max-md:sticky'),
    },
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: 'Select row',
        class: 'translate-y-0.5',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'username',
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: 'Username' }),
    cell: ({ row }) => {
      const username = row.getValue('username') as string
      return h(LongText, { customClass: 'max-w-36 ps-3' }, username || '')
    },
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'inset-s-6 ps-0.5 max-md:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    id: 'fullName',
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: 'Full Name' }),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original as User
      const fullName = `${firstName || ''} ${lastName || ''}`.trim()
      return h(LongText, { customClass: 'max-w-36' }, fullName)
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'email',
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: 'Email' }),
    cell: ({ row }) => {
      const email = row.getValue('email') as string
      return h('div', { class: 'w-fit ps-2 text-nowrap' }, email || '')
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: 'Phone Number' }),
    cell: ({ row }) => {
      const phone = row.getValue('phoneNumber') as string
      return h('div', {}, phone || '')
    },
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: 'Status' }),
    cell: ({ row }) => {
      const { status } = row.original as User
      const badgeColor = callTypes.get(status)
      const statusText = row.getValue('status') as string
      return h('div', { class: 'flex space-x-2' }, [
        h(Badge, { variant: 'outline', class: cn('capitalize', badgeColor) }, statusText || '')
      ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'role',
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: 'Role' }),
    cell: ({ row }) => {
      const { role } = row.original as User
      const userType = roles.find(({ value }) => value === role)
      const roleText = row.getValue('role') as string

      if (!userType) return null

      return h('div', { class: 'flex items-center gap-x-2' }, [
        userType.icon && h(userType.icon, { key: 'icon', size: 16, class: 'text-muted-foreground' }),
        h('span', { key: 'text', class: 'text-sm capitalize' }, roleText || ''),
      ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]

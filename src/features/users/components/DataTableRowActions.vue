<script setup lang="ts">
import { DotsHorizontalIcon } from '@radix-icons/vue'
import { type Row } from '@tanstack/vue-table'
import { Trash2, UserPen } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { User } from '../data/schema'
import { useUsersContext } from './users-provider'

interface Props {
  row: Row<User>
}

defineProps<Props>()

const { setOpen, setCurrentRow } = useUsersContext()
</script>

<template>
  <DropdownMenu :modal="false">
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <DotsHorizontalIcon class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-40">
      <DropdownMenuItem
        @click="
          () => {
            setCurrentRow(row.original)
            setOpen('edit')
          }
        "
      >
        编辑
        <DropdownMenuShortcut>
          <UserPen :size="16" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        class="text-red-500!"
        @click="
          () => {
            setCurrentRow(row.original)
            setOpen('delete')
          }
        "
      >
        删除
        <DropdownMenuShortcut>
          <Trash2 :size="16" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

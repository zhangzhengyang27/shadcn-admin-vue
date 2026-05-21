<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { type Row } from '@tanstack/vue-table'
import { Trash2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { labels } from '../data/data'
import { taskSchema } from '../data/schema'
import { useTasksContext } from './tasks-provider'

interface Props {
  row: Row<unknown>
}

const props = defineProps<Props>()

const task = taskSchema.parse(props.row.original)
const { setOpen, setCurrentRow } = useTasksContext()
</script>

<template>
  <DropdownMenu :modal="false">
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <MoreHorizontal class="h-4 w-4" />
        <span class="sr-only">打开菜单</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-40">
      <DropdownMenuItem
        @click="
          () => {
            setCurrentRow(task)
            setOpen('update')
          }
        "
      >
        编辑
      </DropdownMenuItem>
      <DropdownMenuItem disabled>复制</DropdownMenuItem>
      <DropdownMenuItem disabled>收藏</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>标签</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup :value="task.label">
            <DropdownMenuRadioItem
              v-for="label in labels"
              :key="label.value"
              :value="label.value"
            >
              {{ label.label }}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        class="text-red-500!"
        @click="
          () => {
            setCurrentRow(task)
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
